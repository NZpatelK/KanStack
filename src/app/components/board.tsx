'use client';
import { useState, DragEvent } from "react";
import Column from "./Column";
import { LIST_DATA } from "@/lib/data/listData";
import { FiPlus } from "react-icons/fi";
import DropIndicatorColumn from "./DropIndicatorColumn";


interface ColumnProps {
    title: string;
    headingColor: string;
    column: string;
}

interface CardProps {
    title: string;
    id: string;
    column: string;
}

export default function Board() {
    const [cards, setCards] = useState<CardProps[]>(LIST_DATA);
    const [columns, setColumns] = useState<ColumnProps[]>([
        { title: "Backlog", headingColor: "text-gray-200", column: "backlog" },
        { title: "To Do", headingColor: "text-yellow-200", column: "todo" },
        { title: "In Progress", headingColor: "text-blue-200", column: "doing" },
        { title: "Done", headingColor: "text-emerald-200", column: "done" },
    ]);

    const handleCreateNewColumn = (e) => {
        e.preventDefault();
        const newColumn: ColumnProps = {
            title: "Column " + (columns.length + 1),
            headingColor: "text-gray-200",
            column: "column" + (columns.length + 1),
        };

        setColumns([...columns, newColumn]);

    }

    const handleChangeTitle = (id: string, title: string) => {
        setColumns((prevColumns) =>
            prevColumns.map((column) => {
                if (column.column === id) {
                    return { ...column, title };
                }
                return column;
            })
        );
    };

    const handleUpdateColumnOrder = (before: string, columnId: string) => {
        if (before !== columnId) {
            let copy = [...columns];

            let columnToTransfer = copy.find((c) => c.column === columnId);
            if (!columnToTransfer) return;
            columnToTransfer = { ...columnToTransfer };

            copy = copy.filter((c) => c.column !== columnId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(columnToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.column === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, columnToTransfer);
            }

            setColumns(copy);
        }
    }
    

    return (
        <div className="flex gap-3 m-20">
            {columns.map((column, index) => (
                <>
                    <DropIndicatorColumn key={`indicator-${index}`} beforeId={column.column} column={column.column} />
                    <Column
                        key={column.column}
                        title={column.title}
                        headingColor={column.headingColor}
                        column={column.column}
                        cards={cards}
                        setCards={setCards}
                        handleChangeTitle={handleChangeTitle}
                        handleUpdateColumnOrder={handleUpdateColumnOrder}
                    />
                </>
            ))}
            <DropIndicatorColumn beforeId={"-1"} column={"TODO"} />

            <div className="">
                <button onClick={handleCreateNewColumn} className="flex items-center p-2 text-xs text-nowrap text-gray-400  mt-1 mx-5 hover:text-gray-300"><span className="mr-2">Add Column</span> <FiPlus /></button>
            </div>

        </div>
    );
}
