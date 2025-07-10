'use client';
import { Dispatch, SetStateAction, useState } from "react";
import { FaFire, FaTrash } from "react-icons/fa";
import { DragEvent } from "react";


interface CardProps {
    title: string;
    id: string;
    column: string;
}

interface BarnBarrelProps {
      setCards: Dispatch<SetStateAction<CardProps[]>>;
}


export default function BurnBarrel({ setCards }: BarnBarrelProps) {
    const [active, setActive] = useState(false);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(true);
    }

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(false);
    }

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        
        const cardId = e.dataTransfer.getData("cardId");
        setCards((prev) => prev.filter((card) => card.id !== cardId));
        
        setActive(false);
    }

    return (
        <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl 
        ${active ? "border-red-800 bg-red-800/20 text-red-500" 
        : "border-neutral-500 bg-neutral-500/20 text-neutral-500"}`}>
            {active ? <FaFire className="animate-bounce" /> : <FaTrash  />}
        </div>
    )

}