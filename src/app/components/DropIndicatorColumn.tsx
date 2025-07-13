interface DropIndicatorProps {
    beforeId: string;
    column: string;
}

export default function DropIndicatorColumn( {beforeId, column}: DropIndicatorProps ) {
    return (
        <div 
        data-before={beforeId || "-1"}
        data-board={column}
        className="mx-0.5 w-0.5 bg-violet-400 opacity-0"></div>
    )
    
}