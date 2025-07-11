import DropIndicator from "./DropIndicator"
import { DragEvent } from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { FiTrash } from "react-icons/fi"

interface CardProps {
    title: string
    id: string
    column: string
}

interface DisplayCardProp {
    title: string
    id: string
    column: string
    handleDragStart: (e: DragEvent<HTMLDivElement>, card: CardProps) => void
    handleDeleteCard: (cardId: string) => void
}


export default function Card({ title, id, column, handleDragStart, handleDeleteCard}: DisplayCardProp) {
    const [active, setActive] = useState(false);
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                draggable
                onMouseEnter={() => setActive(true)}
                onMouseLeave={() => setActive(false)}
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                className="relative cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
                <p className="text-sm text-neutral-100">
                    {title}
                </p>
                <div 
                onClick={() => handleDeleteCard(id)}
                className={`group absolute rounded top-1/2 right-2 transition duration-300 bg-gray-900 hover:bg-red-900 p-2 border border-neutral-700 hover:border-red-700 -translate-y-1/2 flex gap-2 ${active ? "opacity-100" : "opacity-0"}`}>
                    <FiTrash className="text-neutral-500 group-hover:text-red-600 transition duration-300" />
                </div>
            </motion.div>
        </>
    )

}