import { Dispatch, SetStateAction, useState, DragEvent } from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";
import { clear } from "console";

interface ColumnProps {
    title: string;
    headingColor: string;
    column: string;
    cards: CardProps[];
    setCards: Dispatch<SetStateAction<CardProps[]>>;
}

interface CardProps {
    title: string;
    id: string;
    column: string;
}

export default function Column({ title, headingColor, column, cards, setCards }: ColumnProps) {
    const [active, setActive] = useState(false);
    const filteredCards = cards.filter((card) => card.column === column);

    const handleDragStart = (e: DragEvent<HTMLDivElement>, card: CardProps) => {
        e.dataTransfer.setData("cardId", card.id);
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    }

    const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
        const indicators = getIndicators() as HTMLDivElement[];
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    }

    const clearHighlights = (els ?: HTMLDivElement[]) => {
        const indicators = els || getIndicators() as HTMLDivElement[];
        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    }

    const getNearestIndicator = (e: DragEvent<HTMLDivElement>, indicators: HTMLDivElement[]) => {
        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + 50);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    }
    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    }

    const handleDragLeave = () => {
        setActive(false);
        clearHighlights();
    }

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(false);
        clearHighlights();
    }

    return (
        <div className="w-56 shrink-0">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium ${headingColor}`}>{title}</h3>
                <span className="rounded text-sm text-neutral-400">{filteredCards.length}</span>
            </div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`h-full w-full transition-colors duration-300  ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"}`}>
                {filteredCards.map((card) => (
                    <Card key={card.id} title={card.title} id={card.id} column={card.column} handleDragStart={handleDragStart} />
                ))}
                <DropIndicator beforeId={"-1"} column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
}
