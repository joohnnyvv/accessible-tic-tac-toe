import React from 'react';
import {usePalette} from "../../../Context/PaletteContext";

function CircleIcon() {
    const { activePalette } = usePalette();

    return (
        <h1 style={{color: activePalette.primaryColor}}>O</h1>
    );
}

export default CircleIcon;