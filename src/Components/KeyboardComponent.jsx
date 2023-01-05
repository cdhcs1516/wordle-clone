import React from 'react';

const KeyboardComponent = (props) => {
	const {
		callBackFunction,
        disabledKeys
	} = props

	const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = [" ", "A", "S", "D", "F", "G", "H", "J", "K", "L", " "];
    const keys3 = ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Del"];

	const createKeyboard = (keys) => {
		// Task 4: your code goes here in return function
        return keys.map((key, index) => {
            let classname = (key === 'Enter' || key === 'Del') ? 'btn-default btn-wide' : 'btn-default';
            const value = key === 'Enter' ? 'submit' : (key === 'Del' ? 'goback' : key);
            if (disabledKeys.includes(key.toLowerCase())) classname += ' btn-disabled';
            return (
                <div key={index} className='col p-0 m-1'>
                    {key !== ' ' && (
                        <button className={classname} value={value} onClick={callBackFunction}>
                            {key}
                        </button>
                    )}
                </div>
            );
        })
    }

	return (
		<div className="keyboard">
            <div className="row m-0"> { createKeyboard(keys1) } </div>
            <div className="row m-0"> { createKeyboard(keys2) } </div>
            <div className="row m-0 pb-2"> { createKeyboard(keys3) } </div>
        </div>
	)
}

export default KeyboardComponent