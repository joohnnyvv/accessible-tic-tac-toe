import React, {useEffect} from 'react';
import {Dropdown, DropdownDivider} from "react-bootstrap";
import {Palette, Palettes, usePalette} from "../../../Context/PaletteContext";
import './DropdownMenu.scss';
// @ts-ignore
import defaultContrastSound from '../../../Assets/s-default-contrast.mp3';
// @ts-ignore
import blackWhiteContrastSound from '../../../Assets/s-black-white-contrast.mp3';
// @ts-ignore
import blackYellowContrastSound from '../../../Assets/s-black-yellow-contrast.mp3';
// @ts-ignore
import orangeWhiteContrastSound from '../../../Assets/s-orange-white-contrast.mp3';
// @ts-ignore
import defaultFontSize from '../../../Assets/s-default-font-size.mp3';
// @ts-ignore
import mediumFontSize from '../../../Assets/s-medium-font-size.mp3';
// @ts-ignore
import largeFontSize from '../../../Assets/s-large-font-size.mp3';
import useSound from "use-sound";
import {useSound as useSoundContext} from '../../../Context/SoundContext';

function DropdownMenu() {
    const {activePalette, setActivePalette} = usePalette();
    const {isSoundEnabled} = useSoundContext();

    const [playDefaultContrastSound] = useSound(defaultContrastSound, {volume: isSoundEnabled ? 1 : 0});
    const [playBlackWhiteContrastSound] = useSound(blackWhiteContrastSound, {volume: isSoundEnabled ? 1 : 0});
    const [playBlackYellowContrastSound] = useSound(blackYellowContrastSound, {volume: isSoundEnabled ? 1 : 0});
    const [playOrangeWhiteContrastSound] = useSound(orangeWhiteContrastSound, {volume: isSoundEnabled ? 1 : 0});
    const [playDefaultFontSize] = useSound(defaultFontSize, {volume: isSoundEnabled ? 1 : 0});
    const [playMediumFontSize] = useSound(mediumFontSize, {volume: isSoundEnabled ? 1 : 0});
    const [playLargeFontSize] = useSound(largeFontSize, {volume: isSoundEnabled ? 1 : 0});

    const fontSizes = {
        default: {
            size: '16px',
            sound: playDefaultFontSize
        },
        medium: {
            size: '24px',
            sound: playMediumFontSize
        },
        large: {
            size: '32px',
            sound: playLargeFontSize
        },
    }

    const palettes: Palettes = {
        contrast1: {
            uiBackground: '#3a415b',
            primaryColor: '#c2c7c7',
            secondaryColor: 'rgba(3,92,164,0.75)',
            crossingColor: '#b04d4d',
            label: 'Default',
            sound: playDefaultContrastSound,
        },
        contrast2: {
            uiBackground: '#000000',
            primaryColor: '#ffffff',
            secondaryColor: '#282727',
            crossingColor: '#ff0000',
            label: 'Black and white',
            sound: playBlackWhiteContrastSound,
        },
        contrast3: {
            uiBackground: '#000000',
            primaryColor: '#ffda16',
            secondaryColor: '#006fff',
            crossingColor: '#ff0000',
            label: 'Black and yellow',
            sound: playBlackYellowContrastSound,
        },
        contrast4: {
            uiBackground: '#c44601',
            primaryColor: '#ffffff',
            secondaryColor: '#000000',
            crossingColor: '#ff0000',
            label: 'Orange and white',
            sound: playOrangeWhiteContrastSound,
        },
    };

    useEffect(() => {
        const storedPalette = localStorage.getItem('chosenPalette');
        if (storedPalette) {
            const parsedPalette = JSON.parse(storedPalette);
            setActivePalette(parsedPalette);
        }
        const storedFontSize = localStorage.getItem('chosenFontSize');
        if (storedFontSize) {
            const parsedFontSize = JSON.parse(storedFontSize);
            handleFontSizeChange(parsedFontSize);
        }
    }, [setActivePalette]);

    const handlePaletteChange = (palette: Palette) => {
        setActivePalette(palette);
        localStorage.setItem('chosenPalette', JSON.stringify(palette));
    };

    const handleFontSizeChange = (size: string) => {
        document.documentElement.style.fontSize = size;
        localStorage.setItem('chosenFontSize', JSON.stringify(size));
    };

    return (
        <Dropdown.Menu
            className='dropdown-menu'
            style={{
                backgroundColor: activePalette.uiBackground,
                borderColor: activePalette.primaryColor
            }}>
            <Dropdown.Header
                style={{
                    backgroundColor: activePalette.primaryColor,
                    color: activePalette.uiBackground
                }}>Color Palettes</Dropdown.Header>
            {Object.entries(palettes).map(([paletteKey, palette]) => (
                <Dropdown.Item key={paletteKey}
                               onClick={() => handlePaletteChange(palette)}
                               onFocus={() => palette.sound()}
                               style={{
                                   color: activePalette.primaryColor,
                                   backgroundColor: 'transparent',
                               }}>
                    {palette.label}
                </Dropdown.Item>
            ))}
            <DropdownDivider/>
            <Dropdown.Header
                style={{
                    backgroundColor: activePalette.primaryColor,
                    color: activePalette.uiBackground
                }}>Font Sizes</Dropdown.Header>
            {Object.entries(fontSizes).map(([sizeKey, size]) => (
                <Dropdown.Item
                    key={sizeKey}
                    onClick={() => handleFontSizeChange(size.size)}
                    onFocus={() => size.sound()}
                    style={{
                        color: activePalette.primaryColor,
                        backgroundColor: 'transparent',
                    }}
                >
                    {sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1)}
                </Dropdown.Item>
            ))}
        </Dropdown.Menu>
    );
}

export default DropdownMenu;