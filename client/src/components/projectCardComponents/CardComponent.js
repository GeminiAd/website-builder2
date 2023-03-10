import React from 'react'

export default function CardComponent({ preview }) {
    const styles = {
        card: {
            width: 200,
            height: 200,
            cursor: 'move',
            lineHeight: 'normal'
        },
        cardHeaderText: {
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            lineHeight: 1.5
        },
        cardBodyText: {
            fontFamily: 'Arial',
            fontSize: 50,
            position: 'relative',
        }
    };

    return (
        <div
            className="card text-center"
            style={styles.card}
            role={preview ? 'CardComponentPreview' : 'CardComponent'}
        >
            <div className="card-header bg-primary text-white">
                <h6 className="card-title m-0"
                    style={styles.cardHeaderText}>
                    Greetings from state!
                </h6>
            </div>
            <div className="card-body d-flex flex-column align-items-start position-relative">
                <p className="card-text" style={styles.cardBodyText}>
                    Hello!
                </p>
            </div>
        </div>
    );
}