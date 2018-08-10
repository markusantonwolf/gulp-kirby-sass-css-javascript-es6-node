
const output = 'Hello Template';

console.info(output);

const content = document.getElementById('content');
content.insertAdjacentHTML('beforeend', output);
