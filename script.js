// Функція для завантаження вмісту текстових файлів
async function loadContentFromFile(file) {
    const fileUrl = `https://ffbccc.github.io/PHILMSUA/${file}`;
    
    const response = await fetch(fileUrl);
    if (response.ok) {
        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);

        let contentDiv = document.getElementById('content');
        contentDiv.innerHTML = ''; // Очищуємо попередній контент

        lines.forEach(line => {
            const [title, link, imageUrl] = line.split(' - '); // Отримуємо назву, посилання та URL зображення
            
            const itemDiv = document.createElement('div');
            itemDiv.innerHTML = `
                <h3>${title}</h3>
                <a href="${link}" target="_blank">Детальніше</a>
                <img src="${imageUrl}" alt="${title}" style="width:200px; height:auto;">
            `;
            contentDiv.appendChild(itemDiv);
        });
    } else {
        console.error('Помилка завантаження файлу:', response.status);
    }
}
