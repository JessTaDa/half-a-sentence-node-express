console.log('hello world');

const form = document.getElementById('form');
const loadingElement = document.getElementById('loading');
const API_URL = 'http://localhost:5000/sentences';
const sentencesElement = document.getElementById('sentences');

loadingElement.style.display = '';

listAllSentences();

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
      // setTimeout(() => {
        form.style.display = '';
      // }, 30000); //don't show form again until after 30 seconds
      listAllSentences();
      loadingElement.style.display = 'none';
    });
})

function listAllSentences() {
  sentencesElement.innerHTML = ''; //clears previous DOM Data
  fetch(API_URL)
    .then(response => response.json())
    .then(sentences => {
      console.log(sentences);
      sentences.reverse();
      sentences.forEach(sentence => {
        const div = document.createElement('div');

        const sentenceTail = document.createElement('p');
        sentenceTail.textContent = sentence.sentenceTail;

        const date = document.createElement('small');
        date.textContent = new Date(sentence.created);

        div.appendChild(sentenceTail);
        div.appendChild(date);
        sentencesElement.appendChild(div);
      })
      loadingElement.style.display = 'none';

    });
};
