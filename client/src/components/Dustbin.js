import { useDrop } from 'react-dnd'
import { ItemTypes } from './projectCardComponents/ItemTypes.js'
import React, { useState, useRef, useCallback } from 'react';
import Card from './projectCardComponents/Card';
import EditableHeader from './projectCardComponents/EditableHeader'
import { useDragDropManager } from 'react-dnd'
import DraggableCard from './projectCardComponents/DraggableCard.js';
import { NativeTypes } from 'react-dnd-html5-backend'

import ProjectHeader from './ProjectHeader';

import { nanoid } from 'nanoid';

export default function Dustbin(props) {
    const { cards, setCards, dustbin, setDustbin, navVisibility, navBar, setNavBar } = props;

    const { style } = dustbin;
    const { background } = style;

    const styles = {
        position: 'relative',
        height: '100%',
        width: '100%',
        color: 'white',
        // textAlign: 'center',
        fontSize: '1rem',
        lineHeight: 'normal',
        ...background
    }

    const handleBackgroundImageChange = (src) => {
        const newDustbin = { ...dustbin };
        newDustbin.style.background = {
            background: `url(${src}) no-repeat center/cover fixed`,
            WebkitBackgroundSize: 'cover',
            MozBackgroundSize: 'cover',
            OBackgroundSize: 'cover',
            // backgroundSize: 'cover'
        };

        setDustbin(newDustbin);
    }

    const createCard = useCallback(
        (item, position) => {
            const newCards = [...cards];
            const headerOffset = document.querySelector('header').offsetHeight;
            const sidebarOffset = document.getElementById('sidebar').offsetWidth;

            newCards.push({
                left: position.x - (sidebarOffset + item.xOffset),
                top: position.y - (headerOffset + item.yOffset),
                width: 200,
                height: 200,
                header: {
                    text: "Greetings from state!",
                    style: {
                        backgroundColor: {
                            r: 13,
                            g: 110,
                            b: 253
                        },
                        color: 'white',
                        fontFamily: 'Arial',
                        fontSize: 16,
                        justifyContent: 'center'
                    }
                },
                body: {
                    style: {
                        r: 255,
                        g: 255,
                        b: 255
                    }
                },
                bodyStyles: [
                    {
                        id: nanoid(),
                        text: "Hello!",
                        type: ItemTypes.BODY_TEXT,
                        style: {
                            fontSize: 50,
                            color: {
                                r: 0,
                                g: 0,
                                b: 0
                            },
                            fontFamily: 'Arial'
                        }
                    }
                ]
            },
            );

            setCards(newCards);
        },
        [cards, setCards]
    )

    const moveCard = useCallback(
        (id, left, top) => {
            const newCards = [...cards];
            newCards[id].left = left;
            newCards[id].top = top;

            setCards(newCards);
        },
        [cards, setCards],
    );

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [
            ItemTypes.CARD,
            ItemTypes.CARD_COMPONENT,
            NativeTypes.FILE
        ],
        drop: (item, monitor) => {
            if (monitor.getItemType() === ItemTypes.CARD) {

                const delta = monitor.getDifferenceFromInitialOffset();
                const left = Math.round(cards[item.id].left + delta.x);
                const top = Math.round(cards[item.id].top + delta.y);

                moveCard(item.id, left, top);

                return undefined;
            } else if (monitor.getItemType() === ItemTypes.CARD_COMPONENT) {
                const position = monitor.getClientOffset();

                createCard(item, position);

                return undefined;
            } else if (monitor.getItemType() === NativeTypes.FILE) {
                if (!monitor.didDrop()) {
                    const file = item.dataTransfer.files[0];

                    const reader = new FileReader();
                    reader.readAsDataURL(file);

                    reader.addEventListener('loadend', () => {
                        const src = reader.result;

                        handleBackgroundImageChange(src);
                    });
                }
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }),
        [cards, setCards]
    )

    return (
        <div
            id='dustbin'
            ref={drop}
            style={{ ...styles }}
            // onDrop={onDrop}
            data-testid="dustbin"
        >
            <div id="renderNavDiv"></div>
            <div id="renderBodyDiv"></div>
            <div id="renderFooterDiv"></div>
            {navVisibility && (
                <ProjectHeader
                    navBar={navBar}
                    setNavBar={setNavBar}
                />
            )}
            {cards.map((card, index) =>
                <DraggableCard
                    key={index}
                    id={index}
                    top={card.top}
                    left={card.left}
                    cards={cards}
                    setCards={setCards}
                />
            )}
        </div>
    )
}