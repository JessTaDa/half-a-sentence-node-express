const express = require('express');
const cors = require('cors');
const monk = require('monk');
const Filter = require('bad-words');
const rateLimit = require('express-rate-limit');

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/sentences');
const sentences = db.get('sentences');
const filter = new Filter;

//the order of middleware express code matters because it runs top down.
app.use(cors()); //installs cors as middleware
app.use(express.json()); //body parsor for anything from client of content-type: application/json

app.get('/', (req, res) => {
  res.json({
    message:'just checking'
  });
});

// retrieve all sentences from database
app.get('/sentences', (req, res) => {
  sentences
    .find()
    .then(sentences => {
      res.json(sentences)
    });
});

function isValidSentence(sentence) {
  return sentence.sentenceTail && sentence.sentenceTail.toString().trim() !== '';
};

//placement is here instead of at line 15 because we don't want to limit the fetch, only post. This is the last point before we execute post.
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));


//insert to db
app.post('/sentences', (req, res) => {
  console.log(req.body);
  if (isValidSentence(req.body)) {
    const sentence = {
      sentenceTail: filter.clean(req.body.sentenceTail.toString()),
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
