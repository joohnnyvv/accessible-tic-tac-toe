import React, {useState} from 'react';
import './TicTacToe.scss';
import {usePalette} from '../../Context/PaletteContext';
import {Button} from 'react-bootstrap';
import CrossIcon from "./CrossIcon/CrossIcon";
import CircleIcon from "./CircleIcon/CircleIcon";

function TicTacToe() {
    const {activePalette, setActivePalette} = usePalette();

    const initialData = ['', '', '', '', '', '', '', '', ''];
    const [data, setData] = useState(initialData);
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [winner, setWinner] = useState<string | null>(null);
    const [isDraw, setIsDraw] = useState<boolean | null>(null)

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

    return (
        <div className='tic-tac-toe-container'>
            <div className='tic-tac-toe-board'>
                <div className='tic-tac-toe-row-1'>
                    {data.slice(0, 3).map((value, index) => (
                        <Button
                            key={index}
                            className='tic-tac-toe-boxes'
                            style={{backgroundColor: activePalette.secondaryColor}}
                            onClick={() => toggleBox(index)}
                        >
                            {value === 'x' ? <CrossIcon/> : value === 'o' ? <CircleIcon/> : null}
                        </Button>
                    ))}
                </div>
                <div className='tic-tac-toe-row-2'>
                    {data.slice(3, 6).map((value, index) => (
                        <Button
                            key={index + 3}
                            className='tic-tac-toe-boxes'
                            style={{backgroundColor: activePalette.secondaryColor}}
                            onClick={() => toggleBox(index + 3)}
                        >
                            {value === 'x' ? <CrossIcon/> : value === 'o' ? <CircleIcon/> : null}
                        </Button>
                    ))}
                </div>
                <div className='tic-tac-toe-row-3'>
                    {data.slice(6, 9).map((value, index) => (
                        <Button
                            key={index + 6}
                            className='tic-tac-toe-boxes'
                            style={{backgroundColor: activePalette.secondaryColor}}
                            onClick={() => toggleBox(index + 6)}
                        >
                            {value === 'x' ? <CrossIcon/> : value === 'o' ? <CircleIcon/> : null}
                        </Button>
                    ))}
                </div>
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
            >
                RESET THE GAME
            </Button>
        </div>
    );
}

export default TicTacToe;
