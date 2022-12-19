import React, { useState, useRef, useEffect } from 'react';

import ImageUploading from "react-images-uploading";
import { Resizable } from 'react-resizable';

import CloseIcon from '@mui/icons-material/Close';

import env from "react-dotenv";

export default function EditableImage({ parentId, id, cards, setCards }) {
    const [iconVisibility, setIconVisibility] = useState(false);
    const [iconBackground, setIconBackground] = useState('rgba(0, 0, 0, 0)');

    const image = cards[parentId].bodyStyles[id];

    const { data_url, style: { width, height } } = image;

    // const { width, height } = image.style;

    const styles = {
        // margin: '.5em 0px',
        width: width,
        height: height
    }

    // useEffect(() => {
    //     const matches = data_url.match(/^data:image\/jpeg;base64,(.*)$/u);
    //     // console.log(matches[1]);

    //     const data = new FormData();
    //     data.append('key', env.IMAGEBB_API_KEY);
    //     data.append('image', matches[1]);

    //     // console.log(env.IMAGEBB_API_KEY);

    //     fetch('https://api.imgbb.com/1/upload',
    //         {
    //             body: data,
    //             method: 'POST'
    //         })
    //         .then(async (response) => {
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 // console.log(data.data);

    //                 const newCards = [...cards];
    //                 newCards[parentId].bodyStyles[id].data = data.data;
    //             } else {
    //                 throw new Error('Something went wrong!');
    //             }
    //         })
    //         .catch(error => console.error(error));
    // }, []);

    const handleRemoveImage = (e) => {
        const newCards = [...cards];
        newCards[parentId].bodyStyles.splice(id, 1);

        setCards(newCards);
    }

    const onMouseEnter = (e) => {
        setIconVisibility(true);
    }

    const onMouseLeave = (e) => {
        setIconVisibility(false);
    }

    const onMouseEnterIcon = (e) => {
        setIconVisibility(true);
        setIconBackground('rgba(0,0,0,.3)');
    }

    const onMouseLeaveIcon = (e) => {
        setIconVisibility(false);
        setIconBackground('rgba(0,0,0,0)');
    }

    const onResize = (event, { element, size, handle }) => {
        const newCards = [...cards];

        newCards[parentId].bodyStyles[id].style.width = size.width;
        newCards[parentId].bodyStyles[id].style.height = size.height;

        setCards(newCards);
    };

    const handleImageChange = (image) => {
        const img = new Image();
        img.onload = function () {
            console.log(this.width + 'x' + this.height);

            const newCards = [...cards];
            newCards[parentId].bodyStyles[id].data_url = image;
            newCards[parentId].bodyStyles[id].style.height = width * (this.height / this.width);

            setCards(newCards);
        }
        img.src = image;
    }

    const onDrop = (e) => {
        e.preventDefault();

        console.log(e);

        // handleImageChange(e.target.currentSrc);

        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.addEventListener('loadend', () => {
            const src = reader.result;

            handleImageChange(src);
        });
    }

    return (
        <div className="my-3">
            <Resizable
                height={height}
                width={width}
                onResize={onResize}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseOver={onMouseEnter}
                lockAspectRatio={true}
            // onMouseOver={onMouseOver}
            // onMouseLeave={onMouseLeave}
            >
                <div>
                    <img
                        src={data_url}
                        style={styles}
                        onDrop={onDrop}
                    />
                    {iconVisibility && (<CloseIcon
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            borderRadius: 1,
                            backgroundColor: iconBackground
                        }}
                        onMouseEnter={onMouseEnterIcon}
                        onMouseLeave={onMouseLeaveIcon}
                        onClick={handleRemoveImage}
                    />)}
                </div>
            </Resizable>
        </div>
    )
}