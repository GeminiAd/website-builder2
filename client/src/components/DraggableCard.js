import React, { useRef, useEffect } from 'react';

import Card from './Card';

import { getEmptyImage } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
        position: 'absolute',
        transform,
        WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        height: isDragging ? 0 : '',
    };
};

export default function DraggableCard(props) {
    const { id, left, top, cards, setCards } = props;

    const canDrag = useRef(true);

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.CARD,
        item: (monitor) => {
            return {
                id,
                top,
                left,
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y
            };
        },
        canDrag: (monitor) => {
            return canDrag.current;
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }),
        [id, top, left]
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, []);

    const onMouseOver = (e) => {
        canDrag.current = !e.target.matches('.react-resizable-handle');
    };

    return (
        <div
            ref={drag}
            style={getStyles(left, top, isDragging)}
            role="DraggableCard"
            onMouseOver={onMouseOver}
        >
            <Card
                id={id}
                cards={cards}
                setCards={setCards}
            />
        </div>
    );
};