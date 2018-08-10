
const output = 'Hello Page';

console.info(output);

const content = document.getElementById('content');

content.insertAdjacentHTML('beforeend', output);
