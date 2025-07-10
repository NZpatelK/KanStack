import { useState } from "react"

interface ColumnProps {
    title: string,
    headingColor: string
    column: string,
    cards: string[],
    setCards: (cards: string[]) => void
}



export default function Column( {title, headingColor, column, cards, setCards}: ColumnProps ) {
    const [active, setActive] = useState(true);

    return (
        <div className="w-56 shrink-0 " >
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">{ cards.length }</span>
            </div>
            <div className={`h-full w-full transition-all ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>

            </div>
        </div>
    )
    
}