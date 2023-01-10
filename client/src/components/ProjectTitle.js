import React, { useLayoutEffect, useState, useRef, useCallback } from 'react';

/* Material UI Icon */
import EditIcon from '@mui/icons-material/Edit';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InputBase from '@mui/material/InputBase';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

import fonts from '../utils/FontsOptions';

import { Resizable } from 'react-resizable';

import { RgbaColorPicker } from "react-colorful";

import useClickOutside from "./cardComponents/ClickOutside";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function ProjectTitle(props) {
    const [editColor, setEditColor] = useState(false);
    const [editIconVisibility, setEditIconVisibility] = useState(false);
    const [editIconBackground, setEditIconBackground] = useState(`rgba(0, 0, 0, 0)`);
    const [editText, setEditText] = useState(false);
    const [editStyle, setEditStyle] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const ref = useRef();
    const styleEditCard = useRef();

    const { navBar, setNavBar } = props;

    const { text, style: { fontFamily, fontSize, fontWeight, color: { r, g, b } } } = navBar.h1;

    const styles = {
        position: 'relative',
        fontFamily,
        fontSize,
        fontWeight,
        color: `rgb(${r}, ${g}, ${b})`
    };

    const closeEditStyle = useCallback(() => setEditStyle(false), []);
    useClickOutside(styleEditCard, closeEditStyle);

    const handleBlur = (e) => {
        setEditText(false);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorChange = ({ r, g, b }) => {
        const newNavBar = { ...navBar };

        newNavBar.h1.style.color.r = r;
        newNavBar.h1.style.color.g = g;
        newNavBar.h1.style.color.b = b;

        setNavBar(newNavBar);
    }

    const handleEditText = () => {
        handleClose();
        setEditText(true);
    }

    const handleEditStyle = () => {
        handleClose();
        setEditStyle(true);
    }

    const handleFontChange = (e) => {
        const newNavBar = { ...navBar };

        newNavBar.h1.style.fontFamily = e.target.value;

        setNavBar(newNavBar);
    }

    const handleFontSizeChange = (e) => {
        const newNavBar = { ...navBar };

        newNavBar.h1.style.fontSize = e.target.value;

        setNavBar(newNavBar);
    }

    const handleFontWeightChange = (e) => {
        const newNavBar = { ...navBar };

        newNavBar.h1.style.fontWeight = e.target.value;

        setNavBar(newNavBar);
    }

    const handleTextChange = (e) => {
        const input = e.target.value;

        setText(input);
    }

    const onMouseEnter = (e) => {
        setEditIconVisibility(true);
    }

    const onMouseLeave = (e) => {
        setEditIconVisibility(false);
    }

    const setText = (text) => {
        const newNavBar = { ...navBar };

        newNavBar.h1.text = text;

        setNavBar(newNavBar);
    }

    return (
        <>
            {editText ?
                <InputBase
                    sx={{
                        ml: 1,
                        flex: 1,
                        color: `rgb(${r}, ${g}, ${b})`,
                        fontSize,
                        fontWeight,
                        fontFamily
                    }}
                    value={text}
                    inputProps={{ 'aria-label': 'project title' }}
                    onBlur={handleBlur}
                    onChange={handleTextChange}
                />
                :
                <h1
                    style={styles}
                    className='ms-3'
                    ref={ref}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    {text}
                    {editIconVisibility && (<EditIcon
                        sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            color: 'black',
                            backgroundColor: editIconBackground,
                            borderRadius: 1,
                            cursor: 'pointer'
                        }}
                        id="edit-icon"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    />)
                    }
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'edit-icon',
                        }}
                    >
                        <MenuItem onClick={handleEditText}>Edit Text</MenuItem>
                        <MenuItem onClick={handleEditStyle}>Edit Style</MenuItem>
                    </Menu>
                </h1>
            }
            {editStyle && (
                <div
                    className='card'
                    ref={styleEditCard}
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 1
                    }}
                >
                    <div className='card-body d-flex'>
                        <div style={{
                            marginRight: '1em'
                        }}>
                            <FormControl>
                                <InputLabel id="demo-simple-select-label">Font</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={fontFamily}
                                    label="Font"
                                    onChange={handleFontChange}
                                    MenuProps={MenuProps}
                                >
                                    {fonts.map((font, index) =>
                                        <MenuItem value={font} key={index}>{font}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Typography
                                id="input-slider"
                                sx={{
                                    color: 'black',
                                    marginTop: '1em',
                                    minWidth: 150
                                }}
                                gutterBottom
                            >
                                Font Size
                            </Typography>
                            <Slider
                                // size="small"
                                value={fontSize}
                                onChange={handleFontSizeChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                min={16}
                                max={75}
                            />
                            <Typography
                                id="input-slider"
                                sx={{
                                    color: 'black',
                                    marginTop: '1em',
                                    minWidth: 150
                                }}
                                gutterBottom
                            >
                                Font Weight
                            </Typography>
                            <Slider
                                // size="small"
                                value={fontWeight}
                                onChange={handleFontWeightChange}
                                aria-label="Default"
                                valueLabelDisplay="auto"
                                step={100}
                                min={100}
                                max={1000}
                            />
                        </div>
                        <RgbaColorPicker color={{ r, g, b, a: 1 }} onChange={handleColorChange} />
                    </div>
                </div>
            )}
        </>
    )
}