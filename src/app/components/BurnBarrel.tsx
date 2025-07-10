'use client';
import { useState } from "react";
import { FaFire, FaTrash } from "react-icons/fa";


interface CardProps {
    title: string;
    id: string;
    column: string;
}

interface BarnBarrelProps {
    cards: CardProps[]
}


export default function BurnBarrel({ cards }: BarnBarrelProps) {
    const [active, setActive] = useState(false);

    return (
        <div className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl 
        ${active ? "border-red-800 bg-red-800/20 text-red-500" 
        : "border-neutral-500 bg-neutral-500/20 text-neutral-500"}`}>
            {active ? <FaFire className="animate-bounce" /> : <FaTrash  />}
        </div>
    )

}