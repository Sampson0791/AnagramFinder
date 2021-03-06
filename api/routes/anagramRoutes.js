//anagramRoutes.js

'use strict';
const express = require('express');
const router = express.Router();

//require the controller
const anagramFinder = require('../controllers/anagramController.js');

// specified routes, the *? syntax on count allows it to be an optional param
router.get('/anagrams/:word.json/:count*?', anagramFinder.findAnagrams);
router.post('/word.json', anagramFinder.createWord);
router.post('/words.json', anagramFinder.createWords);
router.delete('/words/:word.json', anagramFinder.deleteWord);
router.delete('/words.json', anagramFinder.deleteAllWords);

module.exports = router;
