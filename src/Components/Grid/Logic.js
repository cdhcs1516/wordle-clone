import { acceptableWordArr } from "../../Assets/acceptableWords";

// Task 12: Write your code here
const startDate = new Date("5 Jan 2023");
const calculateTime = (event, startDate) => {
    return (event.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
}
const getIndexUsingTime = () => {
   const time = calculateTime(new Date(), startDate);
   return Math.floor(Math.abs(time)) % acceptableWordArr.length;
};

let todaysWord = acceptableWordArr[getIndexUsingTime()].toUpperCase();

const checkIsAcceptableWord = (word) =>{
  // Task 10: Write your code here
  if (word.length < 5) return false;

  return acceptableWordArr.includes(word.toLowerCase());
}

// This function is used for checking whether the word entered is correct or now. 
// It uses `type` parameter and then performs the relevant operations depending on the word's type.
// It returns the respObj object which contains elements that check the validity of the word, 
// the type of the word (correct or incorrect or wrongly placed) and the state of each letter in the word. 
const getObj = (type, word) =>{
  // Task 11: Write your code here
  let respObj;
  switch (type) {
    case 'correct':
      respObj = {
        isValid: true,
        type,
        letterStateArr: Array(5).fill('correct')
      };
      break;
    case 'incorrect':
      respObj = {
        isValid: true,
        type,
        ...getLetterStateArr(word)
      };
      break;
    case 'invalid':
      respObj = {
        isValid: false,
        type,
        letterStateArr: Array(5).fill('default')
      };
      break;
    default:
      break;
  }

  return respObj;
}

const getLetterStateArr = (word) => {
  let freq = {};
  let skippedKeys = {};

  for (let i = 0; i < 5; i++) {
    const letter = todaysWord.at(i);
    if (!freq[letter]) {
      freq[letter] = 0;
    }
    freq[letter] += 1;

    skippedKeys[word.at(i).toLowerCase()] = 1;
  }
  
  let letterStateArr = Array(5).fill('default');
  for (let i = 0; i < 5; i++) {
    const truth = todaysWord.at(i);
    const guess = word.at(i);
    if (truth === guess) {
      letterStateArr[i] = 'correct';
      freq[truth] -= 1;
      delete skippedKeys[guess.toLowerCase()];
    }
  }

  for (let i = 0; i < 5; i++) {
    if (letterStateArr[i] === 'correct') continue;
    const guess = word.at(i);
    if (freq[guess] && freq[guess] > 0) {
      letterStateArr[i] = 'present';
      freq[guess] -= 1;
      delete skippedKeys[guess.toLowerCase()];
    }
    else {
      letterStateArr[i] = 'incorrect';
    }
  }

  return { letterStateArr, skippedKeys };
}

export const validateWord = (word) =>{
  // Task 11: Write your code here
  if (checkIsAcceptableWord(word)) {
    if (word === todaysWord) {
      return getObj('correct', word);
    }
    return getObj('incorrect', word);
  }
  else {
    return getObj('invalid', word);
  }
}