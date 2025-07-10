'use client';
import { useState } from "react";
import Column from "./Column";
import { LIST_DATA } from "@/lib/data/listData";
import BurnBarrel from "./BurnBarrel";

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
    const [columns] = useState<ColumnProps[]>([
        { title: "Backlog", headingColor: "text-gray-200", column: "backlog" },
        { title: "To Do", headingColor: "text-yellow-200", column: "todo" },
        { title: "In Progress", headingColor: "text-blue-200", column: "doing" },
        { title: "Done", headingColor: "text-emerald-200", column: "done" },
    ]);

    return (
        <div className="h-full w-full flex gap-3">
            {columns.map((column, index) => (
                <Column
                    key={index}
                    title={column.title}
                    headingColor={column.headingColor}
                    column={column.column}
                    cards={cards}
                    setCards={setCards} 
                />
            ))}
            <BurnBarrel setCards={setCards} />
        </div>
    );
}
