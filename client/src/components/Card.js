import React, { useState, useRef } from 'react';

import CloseIcon from '@mui/icons-material/Close';

import { useDrag, useDrop } from 'react-dnd';
import { ItemTypes } from './ItemTypes'
import { Resizable } from 'react-resizable';

import EditableHeader from './EditableHeader';
import EditableBody from './EditableBody';
import EditableBodyText from './EditableBodyText'
import EditableImage from './EditableImage';

export default function Card({ id, cards, setCards, preview }) {
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState(`rgba(0, 0, 0, 0)`);
    const [cursor, setCursor] = useState('move');

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

    const onResize = (event, { element, size, handle }) => {
        const newCards = [...cards];

        newCards[id].width = size.width;
        newCards[id].height = size.height;

        setCards(newCards);
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

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [
            ItemTypes.IMAGE_COMPONENT
        ],
        drop: (item, monitor) => {
            console.log(item);
            createImage(item);
            return undefined;
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

    const renderChild = (child, index) => {
        if (child.type === ItemTypes.BODY_TEXT) {
            return <EditableBodyText
                id={index}
                key={index}
                parentId={id}
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
    }

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
                    className="card text-center"
                    style={styles.card}
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