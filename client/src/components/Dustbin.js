import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes.js'

import React, { useState, useRef, useCallback } from 'react';

import Card from './Card';
import EditableHeader from './EditableHeader'

import { useDragDropManager } from 'react-dnd'
import update from 'immutability-helper'
import { isITextSourceModel } from '@cloudinary/transformation-builder-sdk/internal/models/ITextSourceModel.js';
import DraggableCard from './DraggableCard.js';

const style = {
    position: 'relative',
    height: '100%',
    width: '100%',
    color: 'white',
    // textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
}

export default function Dustbin({ cards, setCards }) {

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
                        fontSize: 16
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
            ItemTypes.CARD_COMPONENT
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
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }),
        [cards, setCards]
    )

    // const isActive = canDrop && isOver
    const backgroundColor = '#222'
    // if (isActive) {
    //     backgroundColor = 'darkgreen'
    // } else if (canDrop) {
    //     backgroundColor = 'darkkhaki'
    // }
    return (
        <div
            id='dustbin'
            ref={drop}
            style={{ ...style, backgroundColor }}
            data-testid="dustbin">
            <div id="renderNavDiv"></div>
            <div id="renderBodyDiv"></div>
            <div id="renderFooterDiv"></div>
            {/* {isActive ? 'Release to drop' : 'Drag a box here'} */}
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