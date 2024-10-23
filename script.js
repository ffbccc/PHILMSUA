// Функція для завантаження вмісту текстових файлів
async function loadContentFromFile(file) {
    const response = await fetch(file);
    const text = await response.text();
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Очищуємо попередній контент

    lines.forEach(line => {
        const [title, link] = line.split(' - '); // Розділяємо назву та посилання
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <div>
                <h3>${title}</h3>
            </div>
        `;
        contentDiv.appendChild(itemDiv);
    });
}

// Завантаження контенту для кожної вкладки з відповідного файлу
document.getElementById('anime-tab').addEventListener('click', () => loadContentFromFile('anime.txt'));
document.getElementById('movies-tab').addEventListener('click', () => loadContentFromFile('films.txt'));
document.getElementById('series-tab').addEventListener('click', () => loadContentFromFile('series.txt'));
document.getElementById('cartoons-tab').addEventListener('click', () => loadContentFromFile('cartoons.txt'));
