//server.js

const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// const mongoose = require('mongoose');
const uri = "mongodb+srv://sampson0791:<vx6vNwOYhUSEryYT>@ibottatest-60ihv.mongodb.net/test?retryWrites=true";

const app = express();
const port = 3000;

// MongoClient.connect('mongodb+srv://sampson0791:<password>@ibottatest-60ihv.mongodb.net/test?retryWrites=true', (err, database) => {
//   if (err) return console.log(err);
//   db = client.db('IbottaTest');// whatever your database name is
//   app.listen(3000, () => {
//     console.log('listening on 3000');
//   })
// })

app.use(bodyParser.urlencoded({extended: true}))
// const http = require('http');

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
 const collection = client.db("test").collection("devices");
 console.log('Mongodb connected');
 // perform actions on the collection object
 client.close();
});

// mongoose.connect(uri)
//   .then(() => console.log('Mongodb connected'))
//   .catch((err) => console.log(err));

//Bind connection to error event (to get notification of connection errors)
client.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.get('/anagrams/:word.json', (req, res) => {
  // res.send('Hello World');
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req,res) => {
  console.log(req.body);
})

app.listen(port, () => {
  console.log('Live on port ' + port);
});

// Start the server on port 3000
// app.listen(3000, '127.0.0.1');

// console.log('Node server running on port 3000');

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
