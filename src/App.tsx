import React from 'react';
import logo from './logo.png';
import './App.scss';
import TicTacToe from "./Components/TicTacToe/TicTacToe";
import {usePalette} from "./Context/PaletteContext";
import {Button, Dropdown} from "react-bootstrap";
import DropdownToggle from "./Components/Accessibility/DropdownToggle/DropdownToggle";
import DropdownMenu from "./Components/Accessibility/DropdownMenu/DropdownMenu";
import {GiSoundOff, GiSoundOn} from "react-icons/gi";
import {useSound as useSoundContext} from "./Context/SoundContext";

function App() {

    const {activePalette} = usePalette();
    const {isSoundEnabled, toggleSound} = useSoundContext();

    return (
        <div className='app' style={{backgroundColor: activePalette.uiBackground, color: activePalette.primaryColor}}>
            <div className='header-wrapper'>
                <div className='logo-wrapper'>
                    <img className='app-logo' src={logo} alt='App Logo'/>
                    <p>Accessible Tic Tac Toe</p>
                </div>
                <div className='settings-wrapper'>
                    <Button className='sound-button' style={{borderColor: activePalette.primaryColor}}
                            onClick={() => {
                                toggleSound();
                            }}>
                        {isSoundEnabled ? (
                            <GiSoundOn style={{color: activePalette.primaryColor, height: '100%', width: '3rem'}}/>
                        ) : (
                            <GiSoundOff style={{color: activePalette.primaryColor, height: '100%', width: '3rem'}}/>
                        )}
                    </Button>
                    <Dropdown autoClose='outside'>
                        <DropdownToggle/>
                        <DropdownMenu/>
                    </Dropdown>
                </div>
            </div>
            <TicTacToe/>
            <div className='credentials-container'>
                <p>Katarzyna Kosińska</p>
                <p>Julia Baranienko</p>
                <p>Karolina Davreux</p>
            </div>
        </div>
    );
}

export default App;
