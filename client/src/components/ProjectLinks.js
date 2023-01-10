import React, { useCallback } from 'react';

export default function ProjectLinks(props) {
    const { navBar, setNavBar } = props;

    const { navLinks } = navBar;

    const styles = {
        ul: {
            marginRight: '1em'
        },
        li: {
            display: 'inline',
            margin: '0 1em'
        }
    };

    const renderChild = useCallback((child, index) => {
        return (
            <li
                style={styles.li}
                key={index}
            >
                <a href='#'>{child.text}</a>
            </li>
        );
    }, [navBar, setNavBar])

    return (
        <ul style={styles.ul}>
            {navLinks.map((child, index) => renderChild(child, index))}
        </ul>
    );
}