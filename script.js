async function loadAnimeFromAPI() {
    const apiKey = '401d0beb7a9921aab51e75a21ec538f9';
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16`); // 16 - це жанр аніме
    const data = await response.json();
    
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Очищуємо попередній контент

    data.results.forEach(anime => {
        const itemDiv = document.createElement('div');
        const imageUrl = `https://image.tmdb.org/t/p/w500${anime.poster_path}`; // Отримуємо постер
        itemDiv.innerHTML = `
            <div>
                <img src="${imageUrl}" alt="${anime.name}">
                <h3>${anime.name}</h3>
            </div>
        `;
        contentDiv.appendChild(itemDiv);
    });
}

async function loadMoviesFromAPI() {
    const apiKey = '401d0beb7a9921aab51e75a21ec538f9';
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`);
    const data = await response.json();
    
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    data.results.forEach(movie => {
        const itemDiv = document.createElement('div');
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        itemDiv.innerHTML = `
            <div>
                <img src="${imageUrl}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            </div>
        `;
        contentDiv.appendChild(itemDiv);
    });
}

async function loadSeriesFromAPI() {
    const apiKey = '401d0beb7a9921aab51e75a21ec538f9';
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&sort_by=popularity.desc`);
    const data = await response.json();
    
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    data.results.forEach(tvShow => {
        const itemDiv = document.createElement('div');
        const imageUrl = `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`;
        itemDiv.innerHTML = `
            <div>
                <img src="${imageUrl}" alt="${tvShow.name}">
                <h3>${tvShow.name}</h3>
            </div>
        `;
        contentDiv.appendChild(itemDiv);
    });
}

async function loadCartoonsFromAPI() {
    const apiKey = '401d0beb7a9921aab51e75a21ec538f9';
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16`);
    const data = await response.json();
    
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    data.results.forEach(cartoon => {
        const itemDiv = document.createElement('div');
        const imageUrl = `https://image.tmdb.org/t/p/w500${cartoon.poster_path}`;
        itemDiv.innerHTML = `
            <div>
                <img src="${imageUrl}" alt="${cartoon.title}">
                <h3>${cartoon.title}</h3>
            </div>
        `;
        contentDiv.appendChild(itemDiv);
    });
}

document.getElementById('anime-tab').addEventListener('click', loadAnimeFromAPI);
document.getElementById('movies-tab').addEventListener('click', loadMoviesFromAPI);
document.getElementById('series-tab').addEventListener('click', loadSeriesFromAPI);
document.getElementById('cartoons-tab').addEventListener('click', loadCartoonsFromAPI);
