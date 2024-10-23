async function loadAnimeFromAPI() {
    const apiKey = '401d0beb7a9921aab51e75a21ec538f9';
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=16`);
    const data = await response.json();
    let contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    data.results.forEach(anime => {
        const itemDiv = document.createElement('div');
        const imageUrl = `https://image.tmdb.org/t/p/w500${anime.poster_path}`;
        itemDiv.innerHTML = `
            <div>
                <img src="${imageUrl}" alt="${anime.name}" style="width: 100px; height: 150px;">
                <a href="https://www.themoviedb.org/tv/${anime.id}" target="_blank">${anime.name}</a>
            </div>
        `;
        contentDiv.appendChild(itemDiv);
    });
}

document.getElementById('anime-tab').addEventListener('click', loadAnimeFromAPI);
