import { div } from "framer-motion/client"
import DropIndicator from "./DropIndicator"
import { DragEvent } from "react"

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
}


export default function Card({ title, id, column, handleDragStart }: DisplayCardProp) {
    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <div
                draggable
                onDragStart={(e) => handleDragStart(e, {title, id, column})}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
                <p className="text-sm text-neutral-100">
                    {title}
                </p>
            </div>
        </>
    )

}