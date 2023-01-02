import React, { useEffect, useRef, useCallback } from 'react';

import { useDrag, useDrop } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';

import EditableBodyText from './EditableBodyText';
import { ItemTypes } from './ItemTypes';

function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
        // position: 'absolute',
        // transform,
        // WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        opacity: isDragging ? 0 : 1,
        // height: isDragging ? 0 : '',
    };
};

export default function DraggableEditableBodyText(props) {
    const { id, left, top, parentId, cards, setCards, index, moveBodyText } = props;

    const ref = useRef(null);

    const [{ handlerId }, drop] = useDrop({
        accept: ItemTypes.BODY_TEXT,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            moveBodyText(dragIndex, dragIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    })

    const [{ isDragging }, drag, preview] = useDrag(() => ({
        type: ItemTypes.BODY_TEXT,
        item: (monitor) => {
            return {
                id,
                index,
                parentId,
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y
            };
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }), [index]);

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, []);

    drag(drop(ref));

    const opacity = isDragging ? 0 : 1;

    if (isDragging) {
        console.log(`ID: ${id}, index: ${index}, opacity: ${opacity}`);
        console.log(cards[parentId].bodyStyles[index]);
    }

    return (
        <div
            ref={ref}
            style={{ opacity }}
            role="DraggableEditableBodyText"
            data-handler-id={handlerId}
        >
            <EditableBodyText
                id={id}
                index={index}
                parentId={parentId}
                cards={cards}
                setCards={setCards}
            />
        </div>
    );
}