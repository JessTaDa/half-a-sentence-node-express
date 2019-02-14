const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    message:'just checking'
  });
});


app.listen(5000, () => {
  console.log('listening on localhost:5000')
});
