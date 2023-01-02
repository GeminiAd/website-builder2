import React from 'react';
import EditableBodyText from './EditableBodyText';

export default function EditableBodyTextDragPreview(props) {
    const { id, index, parentId, cards, setCards } = props;

    const styles = {
        display: 'inline-block',
    }

    return (
        <div style={styles}>
            <EditableBodyText id={id} index={index} parentId={parentId} cards={cards} setCards={setCards} preview />
        </div>
    )
}