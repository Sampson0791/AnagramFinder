const Word = require('../models/anagramModel.js');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.createWords = function (req, res) {
  const reqBody = req.body;
  // console.log(req);
  const newWord = new Word({
    word: reqBody.word
  });
  newWord.save().then(word => res.json(word)).catch((err) => console.log(err));;
}
