import { Dispatch, SetStateAction, useState, DragEvent } from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";
import { LuGripVertical } from "react-icons/lu";
import { motion, Variants } from "framer-motion";

interface ColumnProps {
    title: string;
    headingColor: string;
    column: string;
    cards: CardProps[];
    setCards: Dispatch<SetStateAction<CardProps[]>>;
    handleChangeTitle: (id: string, title: string) => void
}

interface CardProps {
    title: string;
    id: string;
    column: string;
}

export default function Column({ title, headingColor, column, cards, setCards, handleChangeTitle }: ColumnProps) {
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

    const clearHighlights = (els?: HTMLDivElement[]) => {
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

        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators as HTMLDivElement[]);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    }

    const handleDeleteCard = (cardId: string) => {
        setCards((prev) => prev.filter((card) => card.id !== cardId));
        setActive(false);
        clearHighlights();
    }

    const gripVariants: Variants = {
        initial: { x: -25 },
        hover: {
            x: 0,
            transition: {
                duration: 0.3,
                ease: [0.42, 0, 0.58, 1], // Equivalent to easeInOut
            },
        },
    };



    return (
        <div className="w-56 shrink-0">
            <div className="relative mb-2 flex items-center justify-between px-1">
                <motion.div
                    initial="initial"
                    whileHover="hover"
                    className="group flex items-center"
                    variants={gripVariants}
                >
                    <LuGripVertical className="text-neutral-400 opacity-0 group-hover:opacity-100 cursor-grab transition duration-300 active:cursor-grabbing" />

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => handleChangeTitle(column, e.target.value)}
                        className={`pl-2 pr-2 rounded font-medium bg-transparent border-none outline-none focus:bg-violet-400/20 focus:outline focus:outline-violet-400 focus:ring-2 focus:ring-violet-400 ${headingColor}`}
                    />
                </motion.div>

                {/* Card count */}
                <span className="rounded text-sm text-neutral-400">
                    {filteredCards.length} 
                </span>
            </div>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDragEnd}
                className={`relative h-full w-full transition-colors duration-300  ${active ? "bg-neutral-800/20" : "bg-neutral-800/0"}`}>
                {filteredCards.map((card) => (
                    <Card key={card.id} title={card.title} id={card.id} column={card.column} handleDragStart={handleDragStart} handleDeleteCard={handleDeleteCard} />
                ))}
                <DropIndicator beforeId={"-1"} column={column} />
                <AddCard column={column} setCards={setCards} />
            </div>
        </div>
    );
}
