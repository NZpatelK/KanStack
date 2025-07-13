import { Dispatch, SetStateAction, useState, DragEvent } from "react";
import Card from "./Card";
import AddCard from "./AddCard";
import DropIndicator from "./DropIndicator";
import { motion, Variants } from "framer-motion";
import { clearHighlights, getIndicators, getNearestIndicator, highlightIndicator } from "@/lib/data/utils/dragHelper";
import ColumnDropIndicator from "./ColumnDropIndicator";

interface ColumnsProps {
    column: ColumnProps;
    cards: CardProps[];
    setCards: Dispatch<SetStateAction<CardProps[]>>;
    handleChangeTitle: (id: string, title: string) => void;
}

interface ColumnProps {
    id: string;
    title: string;
    headingColor: string;
    column: string;
}

interface CardProps {
    title: string;
    id: string;
    column: string;
}

export default function Column({ column, cards, setCards, handleChangeTitle }: ColumnsProps) {
    const [active, setActive] = useState(false);
    const filteredCards = cards.filter((card) => card.column === column.column);

    //------------------------------------- CARD DRAG EVENTS ------------------------------------//
    const handleDragStart = (e: DragEvent<HTMLDivElement>, card: CardProps) => {
        e.dataTransfer.setData("cardId", card.id);
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        highlightIndicator(e, column.column);
        setActive(true);
    }

    const handleDragLeave = () => {
        setActive(false);
        clearHighlights(column.column);
    }

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setActive(false);
        clearHighlights(column.column);

        const cardId = e.dataTransfer.getData("cardId");
        const indicators = getIndicators(column.column);
        const { element } = getNearestIndicator(e, indicators as HTMLDivElement[]);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column: column.column };

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
        clearHighlights(column.column);
    }

    // const gripVariants: Variants = {
    //     initial: { x: -25 },
    //     hover: {
    //         x: 0,
    //         transition: {
    //             duration: 0.3,
    //             ease: [0.42, 0, 0.58, 1], // Equivalent to easeInOut
    //         },
    //     },
    // };



    return (
        <div className="flex">
            <ColumnDropIndicator beforeId={column.id} column={column.column} />
            <div>
                <div className="w-56 shrink-0 flex px-1">
                    <motion.div
                        layout
                        className="group flex items-center">

                        <input
                            type="text"
                            value={column.title}
                            onChange={(e) => handleChangeTitle(column.column, e.target.value)}
                            className={`pl-2 pr-2 rounded font-medium bg-transparent border-none outline-none focus:bg-violet-400/20 focus:outline focus:outline-violet-400 focus:ring-2 focus:ring-violet-400 ${column.headingColor}`}
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
                    <DropIndicator beforeId={"-1"} column={column.column} />
                    <AddCard column={column.column} setCards={setCards} />
                </div>
            </div>
        </div>
    );
}
