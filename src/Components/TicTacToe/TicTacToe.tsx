import React, {useState} from 'react';
import './TicTacToe.scss';
import {usePalette} from '../../Context/PaletteContext';
import {Button} from 'react-bootstrap';
import CrossIcon from "./CrossIcon/CrossIcon";
import CircleIcon from "./CircleIcon/CircleIcon";
// @ts-ignore
import resetSound from '../../Assets/s-reset.mp3';
// @ts-ignore
import topLeftSound from '../../Assets/s-top-left.mp3';
// @ts-ignore
import topCenterSound from '../../Assets/s-top-center.mp3';
// @ts-ignore
import topRightSound from '../../Assets/s-top-right.mp3';
// @ts-ignore
import middleLeftSound from '../../Assets/s-middle-left.mp3';
// @ts-ignore
import middleCenterSound from '../../Assets/s-middle-center.mp3';
// @ts-ignore
import middleRightSound from '../../Assets/s-middle-right.mp3';
// @ts-ignore
import bottomLeftSound from '../../Assets/s-bottom-left.mp3';
// @ts-ignore
import bottomCenterSound from '../../Assets/s-bottom-center.mp3';
// @ts-ignore
import bottomRightSound from '../../Assets/s-bottom-right.mp3';
// @ts-ignore
import circleWonSound from '../../Assets/s-circle-won.mp3';
// @ts-ignore
import crossWonSound from '../../Assets/s-cross-won.mp3';
import useSound from "use-sound";
import {useSound as useSoundContext} from "../../Context/SoundContext";

function TicTacToe() {
    const {activePalette, setActivePalette} = usePalette();
    const {isSoundEnabled} = useSoundContext();

    const initialData = ['', '', '', '', '', '', '', '', ''];
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState<boolean | null>(null)
    const [playResetSound] = useSound(resetSound, {volume: isSoundEnabled ? 1 : 0})
    const [playTopLeftSound] = useSound(topLeftSound, {volume: isSoundEnabled ? 1 : 0});
    const [playTopCenterSound] = useSound(topCenterSound, {volume: isSoundEnabled ? 1 : 0});
    const [playTopRightSound] = useSound(topRightSound, {volume: isSoundEnabled ? 1 : 0});
    const [playMiddleLeftSound] = useSound(middleLeftSound, {volume: isSoundEnabled ? 1 : 0});
    const [playMiddleCenterSound] = useSound(middleCenterSound, {volume: isSoundEnabled ? 1 : 0});
    const [playMiddleRightSound] = useSound(middleRightSound, {volume: isSoundEnabled ? 1 : 0});
    const [playBottomLeftSound] = useSound(bottomLeftSound, {volume: isSoundEnabled ? 1 : 0});
    const [playBottomCenterSound] = useSound(bottomCenterSound, {volume: isSoundEnabled ? 1 : 0});
    const [playBottomRightSound] = useSound(bottomRightSound, {volume: isSoundEnabled ? 1 : 0});
    const [playCircleWonSound] = useSound(circleWonSound, {volume: isSoundEnabled ? 1 : 0});
    const [playCrossWonSound] = useSound(crossWonSound, {volume: isSoundEnabled ? 1 : 0});

    function checkForWin(data: string[]): boolean {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combination of winCombinations) {
            const [a, b, c] = combination;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                setWinner(data[a]);
                if (data[a] === 'o') {
                    setTimeout(() => {
                        playCircleWonSound();
                    }, 1200);
                } else if (data[a] === 'x') {
                    setTimeout(() => {
                        playCrossWonSound();
                    }, 1200);
                }
                return true;
            }
        }
        return false;
    }

    const toggleBox = (index: number) => {
        if (lock || data[index] !== '') {
            return;
        }

        const newData = [...data];

        if (count % 2 === 0) {
            newData[index] = 'o';
        } else {
            newData[index] = 'x';
        }

        setCount(count + 1);
        setData(newData);

        if (checkForWin(newData)) {
            setLock(true);
        } else if (!checkForWin(newData) && count === 8) {
            setIsDraw(true);
            setLock(true);
        }
    };

    const resetGame = () => {
        setData(initialData);
        setCount(0);
        setLock(false);
        setWinner(null);
        setIsDraw(false);
    };

    function getPlaySoundFunction(boxIndex: number): () => void {
        if (winner !== null) {
            return () => {
            };
        } else {
            switch (boxIndex) {
                case 0:
                    return playTopLeftSound;
                case 1:
                    return playMiddleLeftSound;
                case 2:
                    return playBottomLeftSound;
                case 3:
                    return playTopCenterSound;
                case 4:
                    return playMiddleCenterSound;
                case 5:
                    return playBottomCenterSound;
                case 6:
                    return playTopRightSound;
                case 7:
                    return playMiddleRightSound;
                case 8:
                    return playBottomRightSound;
                default:
                    return () => {
                    };
            }
        }
    }


    return (
        <div className='tic-tac-toe-container'>
            <div className="tic-tac-toe-board">
                {[0, 1, 2].map((row) => (
                    <div key={row} className={`tic-tac-toe-row-${row + 1}`}>
                        {[0, 1, 2].map((col) => {
                            const index = row * 3 + col;
                            const value = data[index];
                            const playSound = getPlaySoundFunction(index);
                            return (
                                <Button
                                    key={index}
                                    className="tic-tac-toe-boxes"
                                    style={{backgroundColor: activePalette.secondaryColor}}
                                    onClick={() => toggleBox(index)}
                                    onFocus={playSound}
                                >
                                    {value === 'x' ? <CrossIcon/> : value === 'o' ? <CircleIcon/> : null}
                                </Button>
                            );
                        })}
                    </div>
                ))}
            </div>
            {winner ? (
                <h2>{`PLAYER ${winner.toUpperCase()} WINS!`}</h2>
            ) : isDraw ? (
                <h2>It's a draw!</h2>
            ) : null}
            <Button
                className='tic-tac-toe-reset-button'
                style={{backgroundColor: activePalette.primaryColor, color: activePalette.uiBackground}}
                onClick={resetGame}
                onFocus={() => playResetSound()}
            >
                RESET THE GAME
            </Button>
        </div>
    );
}

export default TicTacToe;
