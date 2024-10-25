// API Key 
const API_KEY = '401d0beb7a9921aab51e75a21ec538f9';

// Функція для отримання ID з URL-адреси
function getIdFromUrl(url) {
    // Видаляємо все перед /tv або /movie
    const idPart = url.replace(/^.*\/(tv|movie)\//, '');
    // Видаляємо все після /
    return idPart.replace(/\/.*$/, '');
}

// Функція для отримання деталей фільму/анімації
async function getDetailsById(id) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=uk-UA`;
    const response = await fetch(detailsUrl);

    if (response.ok) {
        return await response.json();
    } else {
        console.error('Помилка завантаження деталей:', response.status);
    }
    return null;
}

// Функція для створення модального вікна
async function openModal(title, id) {
    const details = await getDetailsById(id);

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h3>${title}</h3>
            <img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="${title}" class="modal-image">
            <p>${details.overview}</p>
            <p>Рейтинг: ${details.vote_average}/10</p>
            <p>Дата виходу: ${details.release_date}</p>
        </div>
    `;
    document.body.appendChild(modal);

    // Закриття модального вікна
    modal.querySelector('.close').onclick = () => {
        document.body.removeChild(modal);
    };
    modal.onclick = (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// Оновлення функції loadContentFromFile
async function loadContentFromFile(file) {
    const fileUrl = `https://ffbccc.github.io/PHILMSUA/${file}`;

    const response = await fetch(fileUrl);
    if (response.ok) {
        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        let contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';

        for (const line of lines) {
            const [title, url] = line.split(' - ');
            const id = getIdFromUrl(url);

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('content-item');
            itemDiv.innerHTML = `
                <h3>${title}</h3>
                <img src="https://image.tmdb.org/t/p/w500/${details.poster_path}" alt="${title}" class="image" data-id="${id}"> 
            `;
            contentDiv.appendChild(itemDiv);
        }

        // Додати обробник подій для зображень
        const images = document.querySelectorAll('.image');
        images.forEach(image => {
            image.onclick = () => {
                const id = image.getAttribute('data-id');
                openModal(title, id);
            };
        });
    } else {
        console.error('Помилка завантаження файлу:', response.status);
    }
}

// Обробка кліків на вкладки
const tabs = document.querySelectorAll('.tabs button');
tabs.forEach(tab => {
    tab.addEventListener('click', async () => {
        const tabId = tab.id;
        let fileToLoad;

        switch (tabId) {
            case 'movies-tab':
                fileToLoad = 'movies.txt';
                break;
            case 'series-tab':
                fileToLoad = 'series.txt';
                break;
            case 'anime-tab':
                fileToLoad = 'anime.txt';
                break;
            case 'cartoons-tab':
                fileToLoad = 'cartoons.txt';
                break;
        }

        if (fileToLoad) {
            await loadContentFromFile(fileToLoad);
        }
    });
});