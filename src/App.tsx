import React, {useEffect} from 'react';
import logo from './logo.png';
import accessibilityIcon from './Assets/accessibility.png';
import './App.scss';
import TicTacToe from "./Components/TicTacToe/TicTacToe";
import {Palette, Palettes, usePalette} from "./Context/PaletteContext";
import {Dropdown, DropdownDivider} from "react-bootstrap";

function App() {

    const fontSizes = {
        default: '16px',
        medium: '24px',
        large: '32px',
    }

    const palettes: Palettes = {
        contrast1: {
            uiBackground: '#3a415b',
            primaryColor: '#c2c7c7',
            secondaryColor: 'rgba(3,92,164,0.75)',
            crossingColor: '#b04d4d',
            label: 'Default',
        },
        contrast2: {
            uiBackground: '#000000',
            primaryColor: '#ffffff',
            secondaryColor: '#282727',
            crossingColor: '#ff0000',
            label: 'Black and white'
        },
        contrast3: {
            uiBackground: '#000000',
            primaryColor: '#ffda16',
            secondaryColor: '#006fff',
            crossingColor: '#ff0000',
            label: 'Black and yellow'
        },
        contrast4: {
            uiBackground: '#c44601',
            primaryColor: '#ffffff',
            secondaryColor: '#000000',
            crossingColor: '#ff0000',
            label: 'Orange and white'
        },
    };

    const {activePalette, setActivePalette} = usePalette();

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
    }, []);

    const handlePaletteChange = (palette: Palette) => {
        setActivePalette(palette);
        localStorage.setItem('chosenPalette', JSON.stringify(palette));
    };

    const handleFontSizeChange = (size: string) => {
        document.documentElement.style.fontSize = size;
        localStorage.setItem('chosenFontSize', JSON.stringify(size));
    };

    return (
        <div className='app' style={{backgroundColor: activePalette.uiBackground, color: activePalette.primaryColor}}>
            <div className='header-wrapper'>
                <div className='logo-wrapper'>
                    <img className='app-logo' src={logo} alt='App Logo'/>
                    <p>Accessible Tic Tac Toe</p>
                </div>
                <div>
                    <Dropdown>
                        <Dropdown.Toggle className='dropdown-button'>
                            <img style={{backgroundColor: activePalette.primaryColor}} className='accessibility-icon'
                                 src={accessibilityIcon} alt='Accessibility Logo'/>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className='dropdown-menu' style={{
                            backgroundColor: activePalette.uiBackground,
                            borderColor: activePalette.primaryColor
                        }}>
                            <Dropdown.Header style={{
                                backgroundColor: activePalette.primaryColor,
                                color: activePalette.uiBackground
                            }}>Color Palettes</Dropdown.Header>
                            {Object.entries(palettes).map(([paletteKey, palette]) => (
                                <Dropdown.Item key={paletteKey} onClick={() => handlePaletteChange(palette)} style={{
                                    color: activePalette.primaryColor,
                                    backgroundColor: 'transparent',
                                }}>
                                    {palette.label}
                                </Dropdown.Item>
                            ))}
                            <DropdownDivider/>
                            <Dropdown.Header style={{
                                backgroundColor: activePalette.primaryColor,
                                color: activePalette.uiBackground
                            }}>Font Sizes</Dropdown.Header>
                            {Object.entries(fontSizes).map(([sizeKey, size]) => (
                                <Dropdown.Item key={sizeKey} onClick={() => handleFontSizeChange(size)} style={{
                                    color: activePalette.primaryColor,
                                    backgroundColor: 'transparent',
                                }}>
                                    {sizeKey.charAt(0).toUpperCase() + sizeKey.slice(1)}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <TicTacToe/>
        </div>
    );
}

export default App;
