console.log('hello world');

const form = document.querySelector('form'); //can also use getElementById
const loadingElement = document.querySelector('.loading');

loadingElement.style.display = 'none';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sentenceTail = formData.get('sentenceTail');
  console.log('frm submitted');

  form.style.display = 'none';
  loadingElement.style.display = '';


})
