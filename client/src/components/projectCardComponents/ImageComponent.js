import React, { useRef, useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

import '../../styles/ImageComponent.css';

export default function ImageComponent(props) {
    const { components, setComponents, imageRef, onDrop } = props;
    const { imageComponent: { image } } = components;

    return (
        <div
            onDrop={onDrop}
        >
            <img ref={imageRef} src={image} alt="" width="100" />
        </div>
    );
}