import { createIndex } from '../../Util/Util';
import Tile from './Tile';

const GameRow = ({ index, rowObjArr }) => {

  // This provides us with the updated tile object by updating both the letter and its state.
  // using the rowObjArr prop passed from the GridComponent. 
  const getTileData = (tile) => {
    // Task 2: Write your code here
    let tileDataObj = {
        letter: '',
        letterState: 'default'
    };

    if (rowObjArr.length > 0) {
        if (rowObjArr[index]) {
            const currRow = rowObjArr[index];
            tileDataObj = {
                letter: currRow.rowWord[tile] || '',
                letterState: currRow.letterStateArr[tile] || 'default'
            }
        }
    }

    return tileDataObj;
  }

  const renderRows = (rowIndex) => {
    // Task 2: Write your code here
    return [0, 1, 2, 3, 4].map(tile => {
        return (
            <div className='col p-1' key={tile}>
                <Tile index={createIndex(rowIndex, tile)} tileDataObj={getTileData(tile)} />
            </div>
        );
    })
  }

  return (
    <div className='row m-0'>
      {renderRows(index)}
    </div>
  )
}

export default GameRow;