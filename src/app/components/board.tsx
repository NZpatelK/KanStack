'use client';
import { useState } from "react";
import Column from "./Column";
import { LIST_DATA } from "@/lib/data/listData";
import BurnBarrel from "./BurnBarrel";
import { FiPlus } from "react-icons/fi";

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

    return (
        <div className="flex gap-3 m-20">
            {columns.map((column, index) => (
                <Column
                    key={index}
                    title={column.title}
                    headingColor={column.headingColor}
                    column={column.column}
                    cards={cards}
                    setCards={setCards}
                    handleChangeTitle={handleChangeTitle}
                />
            ))}

            <div className="">
                <button onClick={handleCreateNewColumn} className="flex items-center text-xs text-nowrap text-gray-400  mt-1 mx-5 hover:text-gray-300"><span className="mr-2">Add Column</span> <FiPlus /></button>
            </div>

            {/* <BurnBarrel setCards={setCards} /> */}
        </div>
    );
}
