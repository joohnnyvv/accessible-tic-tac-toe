import React, {useState} from 'react';
import logo from './logo.png';
import './App.scss';
import TicTacToe from "./Components/TicTacToe/TicTacToe";

function App() {

    type Palette = {
        uiBackground: string;
        primaryColor: string;
        secondaryColor: string;
        crossingColor: string;
    };

    type Palettes = {
        contrast1: Palette;
        contrast2: Palette;
        contrast3: Palette;
    };

    const palettes: Palettes = {
        contrast1: {
            uiBackground: '#3a415b',
            primaryColor: '#c2c7c7',
            secondaryColor: '#035ca4',
            crossingColor: '#b04d4d',
        },
        contrast2: {
            uiBackground: '#1f1f1f',
            primaryColor: '#e74c3c',
            secondaryColor: '#f39c12',
            crossingColor: '#b04d4d',
        },
        contrast3: {
            uiBackground: '#f5f5f5',
            primaryColor: '#9b59b6',
            secondaryColor: '#3498db',
            crossingColor: '#b04d4d',
        },
    };

    const [activePalette, setActivePalette] = useState(palettes.contrast1);

    const handlePaletteChange = (palette: any) => {
        setActivePalette(palette);
    };

    return (
        <div className='app' style={{backgroundColor: activePalette.uiBackground, color: activePalette.primaryColor}}>
            <div className='header-wrapper'>
                <img className='app-logo' src={logo}/>
                <p>Accessible Tic Tac Toe</p>
            </div>
            <TicTacToe/>
        </div>
    );
}

export default App;
