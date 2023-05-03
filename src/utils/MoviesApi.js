const MOVIES_SERVER_URL = 'https://api.nomoreparties.co/beatfilm-movies';

// функция проверки ответа сервера

const checkServerResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

// функция получения фильмов с сервера, метод GET

export const getMovies = async () => {
    return fetch(MOVIES_SERVER_URL)
        .then((res) => checkServerResponse(res));
};
