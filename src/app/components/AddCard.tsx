import { FaPlus } from "react-icons/fa"
import { useState } from "react"

interface CardProps {
    title: string
    id: string
    column: string
}

interface AddCardProps {
    column: string
    setCards: (cards: CardProps[]) => void
}

export default function AddCard({ column, setCards }: AddCardProps) {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    return (
        <>
            {adding ?
                <form>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Add new task..."
                        className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button 
                        onChange={() => {setAdding(false)}}
                        className="px-3 py-1.5 text-xs text-neutral-400 transition-all hover:text-neutral-50">
                            Close
                        </button>
                        <button type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-all hover:bg-neutral-300">
                            Add
                        </button>
                    </div>
                </form> :
                <button onClick={() => setAdding(true)} className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-all hover:text-neutral-50">
                    <span>Add Card</span>
                    <FaPlus />
                </button>
            }
        </>
    )


}