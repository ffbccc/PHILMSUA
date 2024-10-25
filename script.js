const films = [
    { title: "Ззовні (1 сезон)", image: "Philms/Фільми/external_1.jpg", description: "Події серіалу розгортаються у невеликому містечку..." },
    // Додайте інші фільми/серіали/аніме/мультфільми
];

const series = [
    // Додайте серіали
];

const anime = [
    // Додайте аніме
];

const cartoons = [
    // Додайте мультфільми
];

function loadGallery() {
    const filmGallery = document.getElementById('films-gallery');
    films.forEach(film => {
        const img = document.createElement('img');
        img.src = film.image;
        img.alt = film.title;
        img.onclick = () => showDetails(film);
        filmGallery.appendChild(img);
    });
}

function showDetails(film) {
    alert(film.description); // Змініть на відкриття нової сторінки
}

window.onload = loadGallery;
