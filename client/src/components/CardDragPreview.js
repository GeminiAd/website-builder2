import React from 'react';
import Card from './Card';

export default function CardDragPreview({ id, cards, setCards }) {
    const styles = {
        display: 'inline-block',
    }

    return (
        <div style={styles}>
            <Card id={id} cards={cards} setCards={setCards} preview />
        </div>
    )
}