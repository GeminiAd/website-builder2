import React, { useEffect } from 'react';

import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';

import CardComponent from './CardComponent';
import { ItemTypes } from './ItemTypes';

function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`
    return {
        // position: 'absolute',
        // transform,
        // WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        // opacity: isDragging ? 0 : 1,
        // height: isDragging ? 0 : '',
    }
}

export default function DraggableCardComponent(props) {
    const { id, left, top } = props;

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.CARD_COMPONENT,
        item: (monitor) => {
            return {
                id,
                top,
                left,
                position: monitor.getClientOffset(),
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y,
            };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [id, left, top]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, []);

    return (
        <div
            ref={drag}
            style={getStyles(left, top, isDragging)}
            role="DraggableCardComponent"
        >
            <CardComponent />
        </div>
    );
}