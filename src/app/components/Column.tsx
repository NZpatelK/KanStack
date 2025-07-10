import { useState } from "react"
import Card from "./Card"

interface ColumnProps {
    title: string,
    headingColor: string
    column: string,
    cards: CardProps[],
    setCards: (cards: string[]) => void
}

interface CardProps {
    title: string,
    id: string,
    column: string
}



export default function Column( {title, headingColor, column, cards, setCards}: ColumnProps ) {
    const [active, setActive] = useState(false);
    const filteredCards = cards.filter((card) => card.column === column);

    return (
        <div className="w-56 shrink-0 " >
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">{ filteredCards.length }</span>
            </div>
            <div className={`h-full w-full transition-all ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
                {filteredCards.map((card, index) => (
                    <Card key={index} title={card.title} id={card.id} column={card.column} />
                ))}
            </div>
        </div>
    )
    
}