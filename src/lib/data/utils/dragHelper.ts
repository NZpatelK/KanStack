import { DragEvent } from "react";


//-------------------------------- Card (Row) ------------------------------------//

export const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[]
): { offset: number; element: HTMLDivElement } => {
    return indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = e.clientY - (box.top + box.height / 2); // dynamic center

            if (offset < 0 && offset > closest.offset) {
                return { offset, element: child };
            }
            return closest;
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        }
    );
};

export const highlightIndicator = (e: DragEvent<HTMLDivElement>, column: string) => {
    const indicators = getIndicators(column);
    clearHighlights(column, indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
};

export const clearHighlights = (column: string, els?: HTMLDivElement[]) => {
    const indicators = els || getIndicators(column);
    indicators.forEach((i) => {
        i.style.opacity = "0";
    });
};

export const getIndicators = (column: string): HTMLDivElement[] => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
};


//-------------------------------- Column ------------------------------------//

export const getNearestIndicatorColumn = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[]
): { offset: number; element: HTMLDivElement } => {
    const { clientX } = e;

    return indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const boxCenterX = box.left + box.width / 2;
            const offset = clientX - boxCenterX;

            if (Math.abs(offset) < Math.abs(closest.offset)) {
                return { offset, element: child };
            }
            return closest;
        },
        {
            offset: Number.POSITIVE_INFINITY,
            element: indicators[0], // fallback to first column
        }
    );
};

export const getIndicatorsColumn = (boardId?: string): HTMLDivElement[] => {
    return Array.from(document.querySelectorAll(`[data-board="${boardId}"]`));
};

export const highlightIndicatorColumn = (e: DragEvent<HTMLDivElement>, boardId: string) => {
    const indicators = getIndicatorsColumn(boardId);
    clearHighlightsColumn(boardId, indicators);
    const el = getNearestIndicatorColumn(e, indicators);
    el.element.style.opacity = "1";
};

export const clearHighlightsColumn = (boardId: string, els?: HTMLDivElement[]) => {
    const indicators = els || getIndicatorsColumn(boardId);
    indicators.forEach((i) => {
        i.style.opacity = "0";
    });
};
