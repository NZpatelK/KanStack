import { DragEvent } from "react";


//-------------------------------- Card (Row) ------------------------------------//

export const getNearestIndicator = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[]
): { offset: number; element: HTMLDivElement } => {
    return indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = e.clientY - (box.top + 50);

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
