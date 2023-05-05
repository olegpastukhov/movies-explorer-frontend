import MOVIES_SERVER_URL from './constants.js';
import { checkServerResponse } from './utils.js';

// функция получения фильмов с сервера, метод GET

export const getMovies = async () => {
    return fetch(MOVIES_SERVER_URL)
        .then((res) => checkServerResponse(res));
};
