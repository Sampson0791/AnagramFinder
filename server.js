//server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uri = "mongodb+srv://sampson0791:vx6vNwOYhUSEryYT@ibottatest-60ihv.mongodb.net/IbottaProject?retryWrites=true";
const app = express();
const port = 3000;
const anagramRoutes = require('./api/routes/anagramRoutes.js'); // Imports routes

app.use(bodyParser.json());
app.use('/', anagramRoutes);

// Connect to mongo db
mongoose.connect(uri)
 .then(() => console.log('Mongodb connected'))
 .catch((err) => console.log(err));

//Bind connection to error event (to get notification of connection errors)
// client.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, () => {
  console.log('Live on port ' + port);
});

//**********************************************************

// Test code here before setting up node server
// var words = ['read', 'dear', 'dare'];
var fs = require("fs");

var words = fs.readFileSync('dictionary.txt').toString().split('\n');

// Take an array of words and a specific word. identify anagrams of specific wordOne
function findAnagrams(word, words) {
  var anagramArray = [];
  for (i = 0; i < words.length; i++ ) {
    if ( word === words[i] ) {
      continue; //since a word cannot be an anagram of itself, we don't add it here
    } else if ( isAnagram(word, words[i]) ) {
      anagramArray.push(words[i]);
    }
  }
  return anagramArray;
}

//Directly compare two words to find if they are Anagrams, helper for findAnagrams function
function isAnagram(wordOne, wordTwo) {
  // alphabatize both words for comparing
  orderedWordOne = alphabatize(wordOne);
  orderedWordTwo = alphabatize(wordTwo);

  //first check that the 2 words are the same length, otherwise they cannot be an anagram
  if ( orderedWordOne === orderedWordTwo) {
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

console.log(findAnagrams('read', words));
