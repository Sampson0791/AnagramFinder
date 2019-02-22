//server.js

// var express = require('express'),
//   app = express(),
//   port = process.env.PORT || 3000,
//   bodyParser = require('body-parser');
//
// app.listen(port);
//
// console.log('anagram RESTful API server started on: ' + port);

// app.js

const http = require('http');

// Create an instance of the http server to handle HTTP requests
let app = http.createServer((req, res) => {
    // Set a response type of plain text for the response
    res.writeHead(200, {'Content-Type': 'text/plain'});

    // Send back a response and end the connection
    res.end('Hello World!\n');
});

// Start the server on port 3000
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 3000');


//**********************************************************

// Test code here before setting up node server
var words = ['read', 'dear', 'dare'];

// Take an array of words and a specific word. identify anagrams of specific wordOne
function findAnagrams(word, words) {
  var anagramArray = [];
  for (i = 0; i < words.length; i++ ) {
    if ( word === words[i] ) {
      console.log('same word, skipping');
      continue; //since a word cannot be an anagram of itself, we don't add it here
    } else if ( isAnagram(word, words[i]) ) {
      console.log('match found, adding');
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
  console.log(orderedWordOne, orderedWordTwo);
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
