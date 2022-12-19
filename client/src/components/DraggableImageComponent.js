import { left } from '@cloudinary/transformation-builder-sdk/qualifiers/textAlignment';
import React, { useEffect, useState, useRef } from 'react';

import { useDrag } from 'react-dnd'
import { getEmptyImage } from 'react-dnd-html5-backend';

import ImageComponent from './ImageComponent';
import { ItemTypes } from './ItemTypes';

function getStyles(left, top, isDragging) {
    const transform = `translate3d(${left}px, ${top}px, 0)`;

    return {
        // position: 'absolute',
        // transform,
        // WebkitTransform: transform,
        // IE fallback: hide the real node using CSS when dragging
        // because IE will ignore our custom "empty image" drag preview.
        // opacity: isDragging ? 0 : 1,
        // height: isDragging ? 0 : '',
    };
};

export default function DraggableImageComponent(props) {
    const { components, setComponents, top, left } = props;
    const { imageComponent: { image } } = components;

    const inputRef = useRef(null);
    const imageRef = useRef(null);

    const styles = {
        button: {
            width: 100,
            height: 66.66,
            margin: '10px 0'
        },
        input: {
            position: 'absolute',
            visibility: 'hidden'
        }
    };

    const [{ isDragging, }, drag, preview] = useDrag(() => ({
        type: ItemTypes.IMAGE_COMPONENT,
        item: (monitor) => {
            return {
                image,
                height: imageRef.current.offsetHeight,
                xOffset: monitor.getInitialClientOffset().x - monitor.getInitialSourceClientOffset().x,
                yOffset: monitor.getInitialClientOffset().y - monitor.getInitialSourceClientOffset().y,
                position: monitor.getClientOffset()
            }
        },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }), [image, components, setComponents]
    );

    useEffect(() => {
        preview(getEmptyImage(), { captureDraggingState: true })
    }, []);

    const handleImageChange = (src) => {
        const newComponents = { ...components };
        newComponents.imageComponent.image = src;

        setComponents(newComponents);
    }

    const onImageChange = (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('loadend', () => {
            const src = reader.result;

            handleImageChange(src);
        });
    };

    const imageSelect = (e) => {
        inputRef.current.click(e);
    };

    return (
        <div className="my-3">
            {image ?
                <div
                    ref={drag}
                    style={getStyles(left, top, isDragging)}
                    role="DraggableImageComponent"
                    onClick={imageSelect}
                >
                    <ImageComponent imageRef={imageRef} components={components} setComponents={setComponents} />
                </div >
                :
                <button
                    onClick={imageSelect}
                    style={{ ...styles.button }}
                >
                    Click or Drop here
                </button>
            }
            <input
                ref={inputRef}
                id="myInput"
                type="file"
                style={styles.input}
                onChange={onImageChange}
            />
        </div>
    );
}