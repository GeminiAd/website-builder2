import React from 'react';
import { useDragLayer } from 'react-dnd'

import { ItemTypes } from './ItemTypes.js'
import CardComponentDragPreview from './CardComponentDragPreview';
import CardDragPreview from './CardDragPreview'
import ImageComponentDragPreview from './ImageComponentDragPreview.js';

const layerStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
};

function getItemStyles(initialOffset, currentOffset) {
    if (!initialOffset || !currentOffset) {
        return {
            display: 'none',
        };
    } else {
        let { x, y } = currentOffset;
        const transform = `translate(${x}px, ${y}px)`;
        return {
            transform,
            WebkitTransform: transform,
        };
    }
}


export const CustomDragLayer = (props) => {
    const { cards, setCards, components, setComponents } = props;

    const { itemType, isDragging, item, initialOffset, currentOffset } =
        useDragLayer((monitor) => ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        }))

    function renderItem() {
        switch (itemType) {
            case ItemTypes.CARD_COMPONENT:
                return <CardComponentDragPreview />
            case ItemTypes.CARD:
                return <CardDragPreview id={item.id} cards={cards} setCards={setCards} />
            case ItemTypes.IMAGE_COMPONENT:
                return <ImageComponentDragPreview components={components} setComponents={setComponents} />
            default:
                return null
        }
    }

    if (!isDragging) {
        return null
    }

    return (
        <div style={layerStyles}>
            <div
                style={getItemStyles(initialOffset, currentOffset)}
            >
                {renderItem()}
            </div>
        </div>
    )
}