import { DragEvent } from "react";



//-------------------------------- Card ------------------------------------//
export const getNearestIndicator = (e: DragEvent<HTMLDivElement>, indicators: HTMLDivElement[]) => {
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

export const highlightIndicator = (e: DragEvent<HTMLDivElement>, column: string) => {
    const indicators = getIndicators(column) as HTMLDivElement[];
    clearHighlights(column ,indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = "1";
}

export const clearHighlights = (column: string, els?: HTMLDivElement[]) => {
    const indicators = els || getIndicators(column) as HTMLDivElement[];
    indicators.forEach((i) => {
        i.style.opacity = "0";
    });
}

//Fix column issue
export const getIndicators = (column: string) => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
}


//-------------------------------- Column ------------------------------------//

const getNearestIndicatorColumn = (
    e: DragEvent<HTMLDivElement>,
    indicators: HTMLDivElement[]
): HTMLDivElement => {
    const { clientX } = e;

    const nearest = indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();
            const boxCenterX = box.left + box.width / 2;
            const offset = clientX - boxCenterX;

            if (Math.abs(offset) < Math.abs(closest.offset)) {
                return { offset, element: child };
            } else {
                return closest;
            }
        },
        {
            offset: Number.POSITIVE_INFINITY,
            element: indicators[0], // default to the first column
        }
    );

    return nearest.element;
};

const getIndicatorsColumn = (column?: string) => {
    return Array.from(document.querySelectorAll(`[data-board="${column}"]`));
}