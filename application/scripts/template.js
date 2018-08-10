
const outputTemplate = 'Hello Template';

console.info(outputTemplate);

const contentTemplate = document.getElementById('content');
contentTemplate.insertAdjacentHTML('beforeend', outputTemplate);
