
const output = 'Hello Page2';

console.info(output);

const content = document.getElementById('content');
content.insertAdjacentHTML('beforeend', output);
