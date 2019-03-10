//anagramRoutes.js

'use strict';
const express = require('express');
const router = express.Router();

//require the controller
const anagramFinder = require('../controllers/anagramController.js');

// a simple test url to check that all of our files are communicating correctly.
router.get('/anagrams/:word.json', anagramFinder.findAnagrams);
router.post('/word.json', anagramFinder.createWord);
router.post('/words.json', anagramFinder.createWords);
router.delete('/words/:word.json', anagramFinder.deleteWord);
router.delete('/words.json', anagramFinder.deleteAllWords);

module.exports = router;
