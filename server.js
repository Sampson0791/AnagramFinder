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

// Test code here before setting up node server
var words = ['read', 'dear', 'dare'];

//Directly compare two words to find if they are Anagrams
function isAnagram (wordOne, wordTwo) {
  // alphabatize both words for comparing
  orderedWordOne = alphabatize(wordOne);
  orderedWordTwo = alphabatize(wordTwo);

  //first check that the 2 words are the same length, otherwise they cannot be an anagram
  console.log(orderedWordOne, orderedWordTwo);
  if( orderedWordOne === orderedWordTwo) {
    return true;
  } else {
    return false;
  }
}

// Take a string and aplphabatize it for Anagram comparison, helper for isAnagram function
function alphabatize (word) {
  var wordArray = word.split('');
  wordArray.sort();
  wordArray = wordArray.join('');
  console.log(wordArray);
  return wordArray;
}

console.log(isAnagram('dear', 'dare'));
