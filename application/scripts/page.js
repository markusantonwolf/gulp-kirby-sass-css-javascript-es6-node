
const outputPage = 'Hello Page2';

console.info(outputPage);

const contentPage = document.getElementById('content');
contentPage.insertAdjacentHTML('beforeend', outputPage);
