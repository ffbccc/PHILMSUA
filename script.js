document.getElementById('popular-btn').addEventListener('click', function() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('popular-section').style.display = 'block';
});

document.getElementById('back-button').addEventListener('click', function() {
    document.getElementById('popular-section').style.display = 'none';
    document.getElementById('home').style.display = 'block';
});

// Зчитування файлів та відображення контенту
async function loadContent(category) {
    const response = await fetch(`/${category}.txt`);
    const data = await response.text();
    const lines = data.split('\n');
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';
    
    lines.forEach(line => {
        const [title, link] = line.split(' - ');
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
        contentDiv.appendChild(itemDiv);
    });
}

document.getElementById('films-tab').addEventListener('click', () => loadContent('Фільми'));
document.getElementById('series-tab').addEventListener('click', () => loadContent('Серіали'));
document.getElementById('anime-tab').addEventListener('click', () => loadContent('Аніме'));
document.getElementById('cartoons-tab').addEventListener('click', () => loadContent('Мультфільми'));
