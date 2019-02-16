const express = require('express');
const cors = require('cors');
const monk = require('monk');

const app = express();

const db = monk('localhost/sentences');
const sentences = db.get('sentences');

app.use(cors()); //installs cors as middleware
app.use(express.json()); //body parsor for anything from client of content-type: application/json

app.get('/', (req, res) => {
  res.json({
    message:'just checking'
  });
});

function isValidSentence(sentence) {
  return sentence.sentenceTail && sentence.sentenceTail.toString().trim() !== '';
}

app.post('/sentences', (req, res) => {
  console.log(req.body);
  if (isValidSentence(req.body)) {
    //insert to db..
    const sentence = {
      sentenceTail: req.body.sentenceTail.toString(),
      created: new Date()
    };
    console.log(sentence);

    sentences
      .insert(sentence)
      .then(createdSentence => {
        res.json(createdSentence);
      });

  console.log(sentence);
  } else {
    res.status(422);
    res.json({
      message: 'Hey! Please finish your sentence'
    })
  }
});

app.listen(5000, () => {
  console.log('listening on localhost:5000')
});
