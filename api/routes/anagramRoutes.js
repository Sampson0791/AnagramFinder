//anagramRoutes.js

'use strict';
const express = require('express');
const router = express.Router();

//require the controller
const anagramFinder = require('../controllers/anagramController.js');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', anagramFinder.test);
router.post('/words.json', anagramFinder.createWords);

module.exports = router;
