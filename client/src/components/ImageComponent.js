import React, { useRef, useState, useEffect } from 'react'
import { useDrag } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

import ImageUploading from "react-images-uploading";

import testImage from './test/test-image.jpg';

import '../styles/ImageComponent.css';

export default function ImageComponent(props) {
    const { components, setComponents, imageRef } = props;
    const { imageComponent: { image } } = components;

    const handleImageChange = (image) => {
        const newComponents = { ...components };
        newComponents.imageComponent.image = image;

        setComponents(newComponents);
    }

    const onDrop = (e) => {
        e.preventDefault();

        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('loadend', () => {
            const src = reader.result;

            handleImageChange(src);
        });
    }

    return (
        <div
            onDrop={onDrop}
        >
            <img ref={imageRef} src={image} alt="" width="100" />
        </div>
    );
}