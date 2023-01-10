import React from 'react';

export default function CardHeaderText(props) {

    const { cards, setCards, parentId } = props;

    const { text, style: { color, fontFamily, fontSize } } = cards[parentId].header;

    const styles = {
        lineHeight: 1.5,
        fontFamily,
        fontSize,
        fontWeight: 'bold',
        display: 'inline',
        color
    };

    return (
        <h6
            className="card-title m-0"
            style={styles}
        >
            {text}
        </h6>
    );
}