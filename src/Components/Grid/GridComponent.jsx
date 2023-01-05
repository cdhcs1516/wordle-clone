import React, { useEffect, useState } from 'react';
import GameRow from './GameRow';
import { validateWord } from './Logic';

const GridComponent = (props) => {
	const {
		input = [],
		callback,
		gameOver,
        updateKeyboardFunc
	} = props;

	const [pointer, setPointer] = useState({
		"col": 0,
		"row": 0
	});
	const [rowObjArr, setRowObjArr] = useState([]);
	const [activeRow, setActiveRow] = useState(0);
    const [wordResult, setWordResult] = useState('');
    const [lost, setLost] = useState(false);
	const [message, setMessage] = useState("");
	const msgArr = ["Exceptional", "Outstanding", "Amazing", "Great", "Very Good", "That was close", "Better luck next time"]

    const handleKeyboard = (e) => {
        let rowObj = rowObjArr[activeRow];
        let arr = [];

        if (e.key === 'Enter') {
            e.preventDefault();
            onEnter(rowObj, arr);
        }
        else if (e.key === 'Backspace') {
            onDelete(rowObj, arr);
        }
        else {
            let key = e.key.toUpperCase();
            if (key.length === 1 && key <= 'Z' && key >= 'A') {
                if (pointer.col < 5) {    
                    if (message === "Word not in List") {
                        setMessage("");
                    }

                    if (!rowObj) {
                        let obj = {
                            rowWord: '',
                            letterStateArr: Array(5).fill('default')
                        };
                        arr = rowObjArr;
                        obj.rowWord = key;
                        arr.push(obj);
                        setRowObjArr(arr);
                    }
                    else {
                        arr = rowObjArr;
                        rowObj.rowWord += key;
                        arr[activeRow] = rowObj;
                        setRowObjArr(arr);
                    }
                }
        
                let pObj = {
                    'col': Math.min(5, pointer.col + 1),
                    'row': pointer.row
                };
                setPointer(pObj);
            }
        }
    };

    const onKeys = (lastIndex, rowObj, arr) => {
        // Task 5: Write your code here 
        if (pointer.col < 5) {
            let rowWord = '';

            if (message === "Word not in List") {
                setMessage("");
            }

            if (!rowObj) {
                let obj = {
                    rowWord: '',
                    letterStateArr: Array(5).fill('default')
                };
                arr = rowObjArr;
                rowWord = input[lastIndex];
                obj.rowWord = rowWord;
                arr.push(obj);
                setRowObjArr(arr);
            }
            else {
                arr = rowObjArr;
                rowObj.rowWord += input[lastIndex];
                arr[activeRow] = rowObj;
                setRowObjArr(arr);
            }
        }

        let pObj = {
            'col': Math.min(5, pointer.col + 1),
            'row': pointer.row
        };
        setPointer(pObj);
    }
    const onDelete = (rowObj, arr) => {
        // Task 6: Write your code here
        if (pointer.row < 5 && pointer.col !== 0) {
            arr = rowObjArr;
            rowObj.rowWord = rowObj.rowWord.slice(0, -1);
            arr[activeRow] = rowObj;
            setRowObjArr(arr);

            let pObj = {
                'col': Math.max(0, pointer.col - 1),
                'row': pointer.row
            };
            setPointer(pObj);
        }

        setMessage("");
    }
    const onEnter = (rowObj, arr) => {
        // Task 7: Write your code here 
        let respObj = validateWord(rowObj.rowWord);
        if (!respObj.isValid) {
            setMessage('Word is invalid!');
            return;
        }
        
        arr = rowObjArr;
        rowObj.letterStateArr = respObj.letterStateArr;
        arr[activeRow] = rowObj;
        setRowObjArr(arr);

        if (respObj.type === 'correct') {
            setWordResult('correct');
            callback();
        }
        else {
            setWordResult('incorrect');
            updateKeyboardFunc(respObj.skippedKeys);
        }
        
        let pObj = {
            'col': 0,
            'row': pointer.row + 1
        };
        setPointer(pObj);
        setActiveRow(activeRow => activeRow + 1);
    }

	// This is used for updating the `rowObjArr` array which will be passed as a 
    // prop to the GameRow component. 
    useEffect(() => {
		let lastIndex = input.length - 1;
		let rowObj = rowObjArr[activeRow];
		let arr = []

		if (input.length > 0 && !gameOver) {
            // This is for when the keys of the keyboard pressed apart from "Enter" and "Del" are pressed.
			if (input[lastIndex] !== "goback" && input[lastIndex] !== "submit") {
                onKeys(lastIndex, rowObj, arr);
			}
            // This part of the code is when we press the "Del" key. 
			else if (input[lastIndex] === "goback") {
                onDelete(rowObj, arr);
			}
            // This part of the code is when we press the "Enter" key.
            // It also checks to see if the word entered is the correct one or out of the word list range. 
			else if (input[lastIndex] === "submit") {
				onEnter(rowObj, arr);
			}
		}
	}, [input])

    useEffect(() => {
        if (gameOver) return;
        document.addEventListener("keydown", handleKeyboard)
        return () => document.removeEventListener("keydown", handleKeyboard)
    },[handleKeyboard]);

    useEffect(() => {
        if (activeRow === 6) {
            if (wordResult === 'incorrect') {
                setLost(true);
            }
            callback();
        }
    }, [activeRow]);

    useEffect(() => {
        if (gameOver && lost) {
            setMessage(msgArr.at(-1));
        }
        else if (gameOver) {
            setMessage(msgArr[activeRow]);
        }
    }, [gameOver]);

	const displayGrid = () => {
        // Task 3: Write your code here
        return [0, 1, 2, 3, 4, 5].map(index => {
            return (
                <GameRow key={index} index={index} rowObjArr={rowObjArr} activeRow={index} />
            )
        });
	}

    // This part of the code simply shows the message.
	const showMessage = () => {
		return (
			<div className="message-block">
				{message}
			</div>
		)
	}

	return (
		<div className='gridbody-wrapper'>
			{
				message.length > 0 ?
					showMessage() : ""
			}
			<div className='board'>
				{
					displayGrid()
				}
			</div>
		</div>
	)
}

export default GridComponent