
const outputApp = 'Hello App2';

console.info(outputApp);

const contentApp = document.getElementById('content');
contentApp.insertAdjacentHTML('beforeend', outputApp);
