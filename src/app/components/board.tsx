'use client';
import { useState } from "react";
import Column from "./Column";

interface ColumnProps {
    title: string;
    headingColor: string;
    column: string;
}

export default function Board() {
    const [cards, setCards] = useState<string[]>([]);
    const [columns, setColumns] = useState<ColumnProps[]>([
        { title: "To Do", headingColor: "text-yellow-200", column: "todo" },
        { title: "In Progress", headingColor: "text-blue-200", column: "doing" },
        { title: "Done", headingColor: "text-emerald-200", column: "done" }]);

    return (
        <div className="h-full w-full flex gap-3">
            {columns.map((column, index) => (
                <Column key={index} title={column.title} headingColor={column.headingColor} column={column.column} cards={cards} setCards={(e: string[]) => { setCards([...e]) }} />
            ))}
        </div>
    );
}