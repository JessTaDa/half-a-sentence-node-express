const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors()); //installs cors as middleware
app.use(express.json()); //body parsor for anything from client of content-type: application/json

app.get('/', (req, res) => {
  res.json({
    message:'just checking'
  });
});

app.post('/sentence', (req, res) => {
  console.log(req.body);
});

app.listen(5000, () => {
  console.log('listening on localhost:5000')
});
