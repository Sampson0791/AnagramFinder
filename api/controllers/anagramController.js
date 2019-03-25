// anagramController.js

const Word = require('../models/anagramModel.js');

// @route GET /anagrams/:word.json
// compares word in request to databse entries and returns anagrams
// start by getting word entries
exports.findAnagrams = function (req, res, next) {

  Word.find().then(result => {
    res.json(result);
    const resultArray = result.map(x => x.word);
    const anagrams = findAnagrams(req.params.word, resultArray, req.params.count);
    console.log(anagrams);
    const jsonAnagrams = {...anagrams};
    console.log(JSON.stringify(jsonAnagrams));
  }, (reason) => {
    console.log('rejected for ' + reason);
  });
};

// @route POST /word.json
// adds single word to database, used this to test post endpoint and deleting later
exports.createWord = function (req, res) {
  const reqBody = req.body;
  // console.log(req);
  const newWord = new Word({
    word: reqBody.word
  });
  newWord.save().then(result => res.json(result)).catch((err) => console.log(err));
}

// @route POST /words.json
// adds JSON array of words to database
exports.createWords = function (req, res) {
  const reqBody = req.body;
  const wordsArray = [];
  for (var i = 0; i < reqBody.words.length; i++) {
    const newWord = new Word({
      word: reqBody.words[i]
    });
    wordsArray.push(newWord);
  }
  Word.insertMany(wordsArray).then(result => res.json(result)).catch((err) => console.log(err));
}

// @route DELETE /words/:word.json
// deletes single specified word in the request
exports.deleteWord = function (req, res) {
  // Word.findByWord(req.params.word)
  //   .then(word => word,remove().then(() => res.json({success: true})))
  //   .catch(err => res.status(404).json({success: false}));
};

// @route DELETE /words.json
// deletes all word entries from the database
exports.deleteAllWords = function (req, res) {
  Word.deleteMany({}, function(err) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  });
};


// Anagram Finder functions, called in GET request
// Take an array of words and a specific word. identify anagrams of specific word
function findAnagrams(word, words, maxLength) {
  var anagramArray = [];
  console.log('max Length: ' + maxLength);
  for (i = 0; i < words.length; i++ ) {
    if( anagramArray.length == maxLength ) {
      console.log('entered break point');
      return anagramArray;  
    } else if ( word === words[i] ) {
      //since a word cannot be an anagram of itself, we skip adding it
      continue; 
    } else if ( isAnagram(word, words[i]) ) {
      anagramArray.push(words[i]);
    }
    console.log(anagramArray.length);
  }
  return anagramArray;
}

//Directly compare two words to find if they are Anagrams, helper for findAnagrams function
function isAnagram(wordOne, wordTwo) {
  //first check that the 2 words are the same length, otherwise they cannot be an anagram
  if (wordOne.length != wordTwo.length) {
    return false;
  }

  // alphabatize both words for comparing
  orderedWordOne = alphabatize(wordOne);
  orderedWordTwo = alphabatize(wordTwo);

  // Once strings have been ordered alphabetically, simply compare if they are the same string
  if (orderedWordOne === orderedWordTwo) {
    return true;
  } else {
    return false;
  }
}

// Take a string and aplphabatize it for Anagram comparison, helper for isAnagram function
function alphabatize(word) {
  var wordArray = word.split('');
  wordArray.sort();
  wordArray = wordArray.join('');
  return wordArray;
}