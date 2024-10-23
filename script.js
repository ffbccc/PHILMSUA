// API ключ TMDB
const API_KEY = '401d0beb7a9921aab51e75a21ec538f9';

// Функція для отримання зображення за назвою
async function getImageByTitle(title) {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
    const response = await fetch(searchUrl);
    
    if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
            // Повертаємо перше зображення, якщо знайдено
            const firstResult = data.results[0];
            if (firstResult.poster_path) {
                return `https://image.tmdb.org/t/p/w500${firstResult.poster_path}`;
            }
        }
    } else {
        console.error('Помилка завантаження зображення:', response.status);
    }
    return null; // Якщо зображення не знайдено
}

// Функція для завантаження вмісту текстових файлів
async function loadContentFromFile(file) {
    const fileUrl = `https://ffbccc.github.io/PHILMSUA/${file}`;
    
    const response = await fetch(fileUrl);
    if (response.ok) {
        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        let contentDiv = document.getElementById('content');
        contentDiv.innerHTML = ''; // Очищуємо попередній контент

        // Завантажуємо зображення для кожного елемента
        for (const line of lines) {
            const [title, link] = line.split(' - '); // Отримуємо назву та посилання

            const imageUrl = await getImageByTitle(title); // Отримуємо зображення за назвою

            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <h3>${title}</h3>
                <a href="${link}" target="_blank">Детальніше</a>
                ${imageUrl ? `<img src="${imageUrl}" alt="${title}" style="width:200px; height:auto;">` : `<p>Зображення не знайдено</p>`}
            `;
            contentDiv.appendChild(itemDiv);
        }
    } else {
        console.error('Помилка завантаження файлу:', response.status);
    }
}

// Завантаження контенту для кожної вкладки з відповідного файлу
document.getElementById('anime-tab').addEventListener('click', () => loadContentFromFile('anime.txt'));
document.getElementById('movies-tab').addEventListener('click', () => loadContentFromFile('films.txt'));
document.getElementById('series-tab').addEventListener('click', () => loadContentFromFile('series.txt'));
document.getElementById('cartoons-tab').addEventListener('click', () => loadContentFromFile('cartoons.txt'));

