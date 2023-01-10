import React, { useRef, useEffect } from 'react';

import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import CardHeaderText from './CardHeaderText';

export default function DraggableCardHeaderText(props) {
    const { parentId, cards, setCards } = props;

    const { justifyContent: justification } = cards[parentId].header.style;

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.CARD_HEADER_TEXT,
        item: (monitor) => {
            return {
                parentId,
                justification
            };
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }),
        []
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, []);

    return (
        <div
            ref={drag}
            role="DraggableCardHeaderText"
        >
            <CardHeaderText
                parentId={parentId}
                cards={cards}
                setCards={setCards}
            />
        </div>
    );
}