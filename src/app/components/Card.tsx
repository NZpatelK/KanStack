import { div } from "framer-motion/client"
import DropIndicator from "./DropIndicator"

interface CardProps {
    title: string
    id: string
    column: string
}

export default function Card({ title, id, column }: CardProps) {
    return (
        <>
            <div
                draggable
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing">
                <p className="text-sm text-neutral-100">
                    {title}
                </p>
            </div>
            <DropIndicator beforeId={id} column={column} />
        </>
    )

}