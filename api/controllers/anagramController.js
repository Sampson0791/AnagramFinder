const Word = require('../models/anagramModel.js');

//Simple version, without validation or sanitation
exports.findAnagrams = function (req, res) {
    res.send('Greetings from the Test controller!');
};

// POST request /words.json
exports.createWord = function (req, res) {
  const reqBody = req.body;
  // console.log(req);
  const newWord = new Word({
    word: reqBody.word
  });
  newWord.save().then(result => res.json(result)).catch((err) => console.log(err));
}

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
// '{ "words": ["read", "dear", "dare"] , }'

// @route DELETE /words/:word.json
exports.deleteWord = function (req, res) {
  // Word.findByWord(req.params.word)
  //   .then(word => word,remove().then(() => res.json({success: true})))
  //   .catch(err => res.status(404).json({success: false}));
};

// @route DELETE /words.json
exports.deleteAllWords = function (req, res) {
  Word.deleteMany({}, function(err) {
    if(err) {
      console.log(err);
      return res.status(500).send();
    }
    return res.status(200).send();
  });
};
