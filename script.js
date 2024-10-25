// API Key 
const API_KEY = '401d0beb7a9921aab51e75a21ec538f9';

// Функція для отримання ID за назвою
async function getIdByTitle(title) {
    const searchUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
    const response = await fetch(searchUrl);

    if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
            return data.results[0].id; // Повертаємо ID
        }
    } else {
        console.error('Помилка завантаження ID:', response.status);
    }
    return null;
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
            const title = line;
            const id = await getIdByTitle(title);

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