import React from 'react';
import CardComponent from './CardComponent';

export default function CardComponentDragPreview() {
    const styles = {
        display: 'inline-block',
    }

    return (
        <div style={styles}>
            <CardComponent preview />
        </div>
    )
}