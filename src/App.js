import './Assets/App.css';
import './Assets/bootstrap.min.css';
import { useEffect, useState, useReducer } from 'react';
import GridComponent from './Components/Grid/GridComponent';
import KeyboardComponent from './Components/KeyboardComponent';

const App = () => {
  const [key, setKey] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [disabledKeys, setDisabledKeys] = useState([]);

  useEffect(() => {
    if(gameOver){
      console.log("Game Over");
    }
  }, [gameOver])

  const gameConditionCallback = () => setGameOver(true);
  const dataBindCallback = (e) => {
    // Task 8: Write your code here
    setKey(oldKeys => [...oldKeys, e.target.value]);
  }

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const updateKeyboard = (incorrectKeys) => {
    let updatedDisabledKeys = disabledKeys;
    for (let key of Object.keys(incorrectKeys)) {
      if (!updatedDisabledKeys.includes(key)) {
        updatedDisabledKeys.push(key);
      }
    }
    setDisabledKeys(updatedDisabledKeys);
    forceUpdate();
  }

  return (
    <div className='body'>
      <div className='game-container'>
        <div className='game-header'>
          <div>
            WORDLE
          </div>
        </div>
        <div className='game-body'>
          <GridComponent input={key} callback={gameConditionCallback} updateKeyboardFunc={updateKeyboard} gameOver={gameOver}/>
        </div>
        <div className='game-keyboard'>
          <KeyboardComponent callBackFunction={dataBindCallback} disabledKeys={disabledKeys}/>
        </div>

      </div>
    </div>
  );
}

export default App;
