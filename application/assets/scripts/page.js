
const outputPage = 'Hello Page concat';

console.info(outputPage);

const contentPage = document.getElementById('content');
contentPage.insertAdjacentHTML('beforeend', outputPage);
