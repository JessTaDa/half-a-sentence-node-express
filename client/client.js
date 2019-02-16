console.log('hello world');

const form = document.getElementById('form');
const loadingElement = document.getElementById('loading');
const API_URL = 'http://localhost:5000/sentences';

loadingElement.style.display = 'none';
console.log(form);
form.addEventListener('submit', (event) => {
  console.log('hello');
  event.preventDefault();
  const formData = new FormData(form);
  const sentenceTail = formData.get('sentenceTail');

  const sentence = {
    sentenceTail
  };

  form.style.display = 'none';
  loadingElement.style.display = '';

  fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(sentence),
    headers: {
      'content-type': 'application/json'
    }
  }).then(response => response.json())
    .then(createdSentence => {
      console.log(createdSentence);
      form.reset();
      form.style.display = '';
      loadingElement.style.display = 'none';
    });
});
