import React from 'react';
import {usePalette} from "../../../Context/PaletteContext";

function CrossIcon() {
    const { activePalette} = usePalette();

    return (
        <h1 style={{color: activePalette.primaryColor}}>X</h1>
    );
}

export default CrossIcon;