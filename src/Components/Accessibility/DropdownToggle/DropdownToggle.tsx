import React from 'react';
import accessibilityIcon from "../../../Assets/accessibility.png";
import {Dropdown} from "react-bootstrap";
import {usePalette} from "../../../Context/PaletteContext";
// @ts-ignore
import accessibilitySettingsSound from "../../../Assets/s-accessibility-settings.mp3";
import useSound from "use-sound";
import './DropdownToggle.scss';
import {useSound as useSoundContext} from "../../../Context/SoundContext";

function DropdownToggle() {
    const {activePalette} = usePalette();
    const { isSoundEnabled } = useSoundContext();


    const [playAccessibilitySettings] = useSound(accessibilitySettingsSound, { volume: isSoundEnabled ? 1 : 0 });

    return (
            <Dropdown.Toggle
                className='dropdown-button'
                onFocus={() => playAccessibilitySettings()}>
                <img style={{backgroundColor: activePalette.primaryColor}} className='accessibility-icon'
                     src={accessibilityIcon} alt='Accessibility Logo'/>
            </Dropdown.Toggle>
    );
}

export default DropdownToggle;