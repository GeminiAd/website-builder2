import React, { useState, useRef, useEffect, useCallback } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes'
import { Resizable } from 'react-resizable';

import EditableHeader from './EditableHeader';
import EditableBody from './EditableBody';
import DraggableEditableBodyText from './DraggableEditableBodyText'
import EditableImage from './EditableImage';

export default function Card({ id, cards, setCards, preview }) {
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState(`rgba(0, 0, 0, 0)`);
    const [cursor, setCursor] = useState('move');
    const cardRef = useRef(null);

    const { width, height } = cards[id];

    const styles = {
        div: {
            // position: 'absolute',
            // top: top,
            // left: left
        },
        card: {
            minWidth: width,
            minHeight: height,
            lineHeight: 'normal',
            cursor: cursor,
        }
    };

    const { header } = cards[id];

    const createImage = (item, monitor) => {
        const newCards = [...cards];
        newCards[id].bodyStyles.push({
            type: ItemTypes.IMAGE,
            data_url: item.image,
            style: {
                width: 100,
                height: item.height
            }
        });

        setCards(newCards);
    }

    const handleRemoveCard = (e) => {
        const newCards = [...cards];
        newCards.splice(id, 1);

        setCards(newCards);
    }

    const moveBodyText = useCallback((dragIndex, hoverIndex) => {
        const newCards = [...cards];
        const { bodyStyles } = newCards[id];
        const dragged = { ...bodyStyles[dragIndex] };
        newCards[id].bodyStyles.splice(dragIndex, 1);
        newCards[id].bodyStyles.splice(hoverIndex, 0, dragged);

        setCards(newCards);
    }, [cards, setCards]);

    const onResize = (event, { element, size, handle }) => {
        setDimensions(size.width, size.height);
        // const newCards = [...cards];

        // newCards[id].width = size.width;
        // newCards[id].height = size.height;

        // setCards(newCards);
    };

    const onMouseLeave = (e) => {
        setIconVisibility(false);
    }

    const onMouseOver = (e) => {
        if (pointerOverIcon(e.clientX, e.clientY)) {
            setCursor('pointer');
        } else {
            setCursor('move');
        }
        setIconVisibility(true);
    };

    const onMouseIconEnter = (e) => {
        setIconBackground(`rgba(0, 0, 0, .3)`);
    }

    const onMouseIconLeave = (e) => {
        setIconBackground(`rgba(0, 0, 0, 0)`);
    }

    const setDimensions = (width, height) => {
        const newCards = [...cards];

        newCards[id].width = width;
        newCards[id].height = height;

        setCards(newCards);
    }

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [
            ItemTypes.IMAGE_COMPONENT
        ],
        drop: (item, monitor) => {
            if (!monitor.didDrop()) {
                createImage(item);
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }),
        [cards, setCards]
    );

    const pointerOverIcon = (x, y) => {
        const elements = document.elementsFromPoint(x, y);

        for (const element of elements) {
            if (element.classList.value.includes('MuiSvgIcon-root')) {
                return true;
            }
        }

        return false;
    }

    // useEffect(() => {
    //     const resize_ob = new ResizeObserver(function (entries) {
    //         let rect = entries[0].contentRect;

    //         let newWidth = rect.width;
    //         let newHeight = rect.height;

    //         // console.log('Current Width : ' + newWidth);
    //         // console.log('Current Height : ' + newHeight);
    //         if (newWidth > width && newHeight > height) {
    //             setDimensions(newWidth, newHeight);
    //         } else if (newWidth > width) {
    //             setDimensions(newWidth, height);
    //         } else if (newHeight > height) {
    //             setDimensions(width, newHeight);
    //         }
    //     });

    //     const card = document.getElementById(`card-${id}`);
    //     resize_ob.observe(card);

    //     return () => {
    //         resize_ob.unobserve(card);
    //     };
    // }, []);

    const renderChild = useCallback((child, index) => {
        if (child.type === ItemTypes.BODY_TEXT) {
            return <DraggableEditableBodyText
                id={child.id}
                key={child.id}
                index={index}
                parentId={id}
                moveBodyText={moveBodyText}
                cards={cards}
                setCards={setCards}
            />;
        } else if (child.type === ItemTypes.IMAGE) {
            return <EditableImage
                id={index}
                key={index}
                parentId={id}
                cards={cards}
                setCards={setCards}
            />;
        } else {
            return null;
        }
    }, [cards, setCards])

    return (
        <Resizable
            height={height}
            width={width}
            onResize={onResize}
            onMouseOver={onMouseOver}
            onMouseLeave={onMouseLeave}
            role={preview ? 'CardPreview' : 'Card'}
        >
            <div ref={drop} style={styles.div}>
                <div
                    className="card"
                    id={`card-${id}`}
                    style={styles.card}
                    ref={cardRef}
                >
                    {header && (
                        <EditableHeader
                            cards={cards}
                            setCards={setCards}
                            parentId={id}
                            text={cards[id].header.text}
                        />
                    )}
                    <EditableBody
                        parentId={id}
                        cards={cards}
                        setCards={setCards}
                    >
                        {cards[id].bodyStyles.map((child, index) => renderChild(child, index))}
                    </EditableBody>
                    {iconVisibility && (
                        <CloseIcon
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                backgroundColor: iconBackground,
                                borderRadius: 1
                            }}
                            onMouseEnter={onMouseIconEnter}
                            onMouseLeave={onMouseIconLeave}
                            onClick={handleRemoveCard}
                        />)}
                </div>
            </div>
        </Resizable>
    );
}