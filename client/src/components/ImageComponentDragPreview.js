import React from 'react';
import ImageComponent from './ImageComponent';

export default function ImageComponentDragPreview(props) {
    const { components, setComponents } = props;

    const styles = {
        display: 'inline-block',
    }

    return (
        <div style={styles}>
            <ImageComponent components={components} setComponents={setComponents} preview />
        </div>
    )
}