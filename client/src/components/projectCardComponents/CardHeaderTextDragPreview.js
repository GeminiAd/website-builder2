import React from 'react';
import CardHeaderText from './CardHeaderText';

export default function CardHeaderTextDragPreview({ parentId, cards, setCards }) {
    const styles = {
        display: 'inline-block',
    }

    return (
        <div style={styles}>
            <CardHeaderText parentId={parentId} cards={cards} setCards={setCards} preview />
        </div>
    )
}