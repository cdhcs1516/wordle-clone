import React, { useState } from "react";
import { useEffect } from "react";

const Tile = (props) =>{
  // The object containing the letter pressed on the keyboard and its state (whether the letter
  // is correct or not) is passed as a prop to the tile of the grid. 
  const {
    _,
    tileDataObj={
      "letter":"",
      "letterState":"default"
    }
  } = props;
  
  // This is used for storing the letter state i.e: whether the letter is correct, incorrect, or wrongly placed (present).
  // The letter state will always be of the format: "tile <letter state>" 
  // where <letter state> can be: default, correct, incorrect, present. 
  const [classname, setClassname] = useState("tile default");

  useEffect(()=>{
    // Task 1a: Write your code here
    setClassname(`tile ${tileDataObj.letterState}`);
  }, [tileDataObj])

  return(
    // Task 1b: Write your code here
    <div className={classname}>
        {tileDataObj.letter}
    </div>
  )
}

export default Tile