'use client';
import { useState } from "react";
import Column from "./Column";
import { LIST_DATA } from "@/lib/data/listData";
import { FiPlus } from "react-icons/fi";


interface ColumnProps {
    id: string;
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
        { id: "1", title: "Backlog", headingColor: "text-gray-200", column: "backlog" },
        { id: "2", title: "To Do", headingColor: "text-yellow-200", column: "todo" },
        { id: "3", title: "In Progress", headingColor: "text-blue-200", column: "doing" },
        { id: "4", title: "Done", headingColor: "text-emerald-200", column: "done" },
    ]);

    const handleCreateNewColumn = (e) => {
        e.preventDefault();
        const newColumn: ColumnProps = {
            id: (columns.length + 1).toString(),
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


    return (
        <div className="flex gap-3 m-20">
            {columns.map((column) => (
                <Column
                    key={column.id}
                    column={column}
                    cards={cards}
                    setCards={setCards}
                    handleChangeTitle={handleChangeTitle}
                />
            ))}

            <div className="">
                <button onClick={handleCreateNewColumn} className="flex items-center p-2 text-xs text-nowrap text-gray-400  mt-1 mx-5 hover:text-gray-300"><span className="mr-2">Add Column</span> <FiPlus /></button>
            </div>

        </div>
    );
}
