
const outputPage = 'Hello Page';

console.info(outputPage);

const contentPage = document.getElementById('content');
contentPage.insertAdjacentHTML('beforeend', outputPage);
