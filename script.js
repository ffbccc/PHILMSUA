// Ключ API
const API_KEY = '401d0beb7a9921aab51e75a21ec538f9';
const LANGUAGE = 'uk-UA';

// Функція для отримання детальної інформації про фільм або серіал за ID
async function getDetailsById(id, type) {
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=${LANGUAGE}&append_to_response=videos`;
    const response = await fetch(url);
    
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Помилка завантаження деталей:', response.status);
        return null;
    }
}

// Функція для відображення модального вікна з деталями
function showModal(details) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    
    const trailer = details.videos.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${details.title || details.name}</h2>
            <p>${details.overview}</p>
            ${trailer ? `<iframe width="560" height="315" src="https://www.youtube.com/embed/${trailer.key}" frameborder="0" allowfullscreen></iframe>` : ''}
            <img src="https://image.tmdb.org/t/p/w500${details.poster_path}" alt="${details.title || details.name}">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закриття модального вікна
    modal.querySelector('.close').onclick = () => modal.remove();
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// Оновлена функція для завантаження контенту
async function loadContentFromFile(file) {
    const fileUrl = `https://ffbccc.github.io/PHILMSUA/${file}`;
    const response = await fetch(fileUrl);
    
    if (response.ok) {
        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        
        let contentDiv = document.getElementById('content');
        contentDiv.innerHTML = '';
        
        for (const line of lines) {
            const [title, link] = line.split(' - ');
            const imageUrl = await getImageByTitle(title);
            const data = await getImageData(title);
            
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('content-item');
            itemDiv.innerHTML = `
                <h3>${title}</h3>
                <a href="${link}" target="_blank">Детальніше</a>
                ${imageUrl ? `<img src="${imageUrl}" alt="${title}" data-id="${data.id}" data-type="${data.media_type}">` : `<p>Зображення не знайдено</p>`}
            `;
            
            contentDiv.appendChild(itemDiv);
            
            // Додамо обробник подій для зображення
            if (imageUrl) {
                itemDiv.querySelector('img').addEventListener('click', async (e) => {
                    const id = e.target.dataset.id;
                    const type = e.target.dataset.type;
                    const details = await getDetailsById(id, type);
                    if (details) showModal(details);
                });
            }
        }
    } else {
        console.error('Помилка завантаження файлу:', response.status);
    }
}
