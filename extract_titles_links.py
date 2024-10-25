
import requests
import logging
import re

# Налаштування логування
logging.basicConfig(filename='search_log.log', level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# Задайте ваш API ключ
API_KEY = '401d0beb7a9921aab51e75a21ec538f9'

# Функція для очищення назв
def clean_title(title):
    title = title.strip()  # Видаляємо зайві пробіли з початку і кінця
    title = re.sub(r'[^\w\s]', '', title)  # Видаляємо всі спеціальні символи
    return title

# Функція для пошуку аніме спочатку як телешоу, потім як фільм
def search_anime(anime_title):
    anime_title = clean_title(anime_title)
    
    # Пошук як телешоу
    url_tv = f'https://api.themoviedb.org/3/search/tv?api_key={API_KEY}&query={anime_title}&include_adult=false'
    response_tv = requests.get(url_tv)
    if response_tv.status_code == 200:
        results_tv = response_tv.json().get('results', [])
        if results_tv:
            tv_id = results_tv[0]['id']
            tv_url = f'https://www.themoviedb.org/tv/{tv_id}'
            logging.info(f"Знайдено телешоу: {anime_title} - {tv_url}")
            return results_tv[0]['name'], tv_url
        else:
            logging.info(f"Телешоу не знайдено: {anime_title}")
    
    # Якщо не знайдено телешоу, пошук як фільм
    url_movie = f'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={anime_title}&include_adult=false'
    response_movie = requests.get(url_movie)
    if response_movie.status_code == 200:
        results_movie = response_movie.json().get('results', [])
        if results_movie:
            movie_id = results_movie[0]['id']
            movie_url = f'https://www.themoviedb.org/movie/{movie_id}'
            logging.info(f"Знайдено фільм: {anime_title} - {movie_url}")
            return results_movie[0]['title'], movie_url
        else:
            logging.info(f"Фільм не знайдено: {anime_title}")
    
    logging.warning(f"Не знайдено жодної інформації: {anime_title}")
    return None, None

# Функція для запису результатів у файл
def write_results_to_file(titles, output_file):
    with open(output_file, 'w', encoding='utf-8') as f:
        for title in titles:
            anime_name, anime_url = search_anime(title)
            if anime_name:
                f.write(f"{title} - {anime_url}\n")
            else:
                f.write(f"{title} - не знайдено\n")

# Читання назв аніме з текстового файлу
def read_anime_titles(input_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        return [line.strip() for line in f.readlines()]

# Основна частина скрипта
if __name__ == '__main__':
    input_file = 'series.txt'  # Задайте файл з назвами аніме
    output_file = 'results.txt'  # Файл для запису результатів

    anime_titles = read_anime_titles(input_file)
    write_results_to_file(anime_titles, output_file)

    print(f"Результати записані в файл: {output_file}")
