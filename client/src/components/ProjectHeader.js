import React, { useRef, useState, useCallback } from 'react';

import { Resizable } from 'react-resizable';

/* Material UI Icon */
import EditIcon from '@mui/icons-material/Edit';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import useClickOutside from "./projectCardComponents/ClickOutside";

import ProjectTitle from './ProjectTitle';
import ProjectLinks from './ProjectLinks';

import '../styles/EditableHeader.css'

export default function ProjectHeader(props) {
    const [editBackgroundColor, setEditBackgroundColor] = useState(false);
    const [editIconVisibility, setEditIconVisibility] = useState(false);
    const [editIconBackground, setEditIconBackground] = useState(`rgba(0, 0, 0, 0)`);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const backgroundColorPopover = useRef();
    const backgroundColorEditCard = useRef();

    const { navBar, setNavBar } = props;

    const { style: { height, width, background: { backgroundStyle, backgroundColor: { r, g, b }, rightGradient: { r: rightR, g: rightG, b: rightB } } } } = navBar;

    const styles = {
        height,
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: backgroundStyle === 'solid' ? `rgba(${r}, ${g}, ${b}, 1)` : `linear-gradient(to bottom right, rgba(${r}, ${g}, ${b}, 1), rgba(${rightR}, ${rightG}, ${rightB}, 1))`
    };

    const closeBackgroundColorSelector = useCallback(() => setEditBackgroundColor(false), []);
    useClickOutside(backgroundColorEditCard, closeBackgroundColorSelector);

    const handleBackgroundColorChange = ({ r, g, b }) => {
        const newNavBar = { ...navBar };

        newNavBar.style.background.backgroundColor.r = r;
        newNavBar.style.background.backgroundColor.g = g;
        newNavBar.style.background.backgroundColor.b = b;

        if (backgroundStyle === 'solid') {
            newNavBar.style.background.rightGradient.r = r;
            newNavBar.style.background.rightGradient.g = g;
            newNavBar.style.background.rightGradient.b = b;
        }

        setNavBar(newNavBar);
    }

    const handleRightGradientColorChange = ({ r, g, b }) => {
        const newNavBar = { ...navBar };

        newNavBar.style.background.rightGradient.r = r;
        newNavBar.style.background.rightGradient.g = g;
        newNavBar.style.background.rightGradient.b = b;

        setNavBar(newNavBar);
    }

    const handleBackgroundStyleChange = (e) => {
        const newNavBar = { ...navBar };
        newNavBar.style.background.backgroundStyle = e.target.value;
        setNavBar(newNavBar);
    }

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditBackgroundColor = () => {
        handleClose();
        setEditBackgroundColor(true);
    };

    const handleEditIconClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const onMouseEnter = (e) => {
        setEditIconVisibility(true);
    }

    const onMouseEnterEditIcon = () => {
        setEditIconBackground(`rgba(0, 0, 0, .3)`);
    }

    const onMouseLeave = (e) => {
        setEditIconVisibility(false);
    }

    const onMouseLeaveEditIcon = () => {
        setEditIconBackground(`rgba(0, 0, 0, 0)`);
    }

    const onResize = (event, { element, size, handle }) => {
        setHeight(size.height);
    };

    const setHeight = (height) => {
        const newNavBar = { ...navBar };

        newNavBar.style.height = height;

        setNavBar(newNavBar);
    }

    return (
        <Resizable
            axis={'y'}
            resizeHandles={['s']}
            height={height}
            width={width}
            onResize={onResize}
        >
            <header
                style={styles}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {editIconVisibility && (
                    <>
                        <EditIcon
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
                            onMouseEnter={onMouseEnterEditIcon}
                            onMouseLeave={onMouseLeaveEditIcon}
                            onClick={handleEditIconClick}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'edit-icon',
                            }}
                        >
                            <MenuItem onClick={handleEditBackgroundColor}>Edit Background Color</MenuItem>
                        </Menu>
                    </>
                )}
                <ProjectTitle
                    navBar={navBar}
                    setNavBar={setNavBar}
                />
                <ProjectLinks
                    navBar={navBar}
                    setNavBar={setNavBar}
                />
                {editBackgroundColor && (
                    <div
                        className='card'
                        ref={backgroundColorEditCard}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            zIndex: 1
                        }}
                    >
                        <div className='card-body d-flex'>
                            <div className="project-header-popover"
                                ref={backgroundColorPopover}
                            >
                                <RgbaColorPicker color={{ r, g, b, a: 1 }} onChange={handleBackgroundColorChange} />
                            </div>
                            <FormControl
                                sx={{
                                    margin: '0 1em'
                                }}
                            >
                                <FormLabel
                                    id="demo-radio-buttons-group-label"
                                    sx={{
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Background Color
                                </FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    value={backgroundStyle}
                                    onChange={handleBackgroundStyleChange}
                                    name="radio-buttons-group"
                                >
                                    <FormControlLabel
                                        value="solid"
                                        control={<Radio />}
                                        label="Solid"
                                        sx={{
                                            color: 'black'
                                        }}
                                    />
                                    <FormControlLabel
                                        value="linear-gradient"
                                        control={<Radio />}
                                        label="Linear Gradient"
                                        sx={{
                                            color: 'black'
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                            {backgroundStyle === 'linear-gradient' &&
                                <RgbaColorPicker color={{ r: rightR, g: rightG, b: rightB, a: 1 }} onChange={handleRightGradientColorChange} />
                            }
                        </div>
                    </div>
                )}
            </header>
        </Resizable>
    );
}