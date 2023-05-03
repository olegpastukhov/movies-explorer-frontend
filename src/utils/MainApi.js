const BASE_SERVER_URL = 'https://api.diploma.pastukhovoa.ru';
// const BASE_SERVER_URL = 'http://localhost:3001';

const MOVIES_SERVER = 'https://api.nomoreparties.co/';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

// функция проверки ответа сервера

const checkServerResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

// функция регистрации пользователя, принимает name, email, password, передаёт на бэкенд по методу POST

export const register = async ({ name, email, password }) => {
    return fetch(`${BASE_SERVER_URL}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            name,
            email,
            password
        }),
    }).then((res) => checkServerResponse(res));
};

// функция авторизации пользователя на бэкенде, принимает email и password, метод POST

export const authorize = async ({ email, password }) => {
    return fetch(`${BASE_SERVER_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
        headers,
        body: JSON.stringify({ email, password }),
    }).then((res) => checkServerResponse(res));
};

// функция выхода из аккаунта, метод POST

export const logout = async () => {
    return fetch(`${BASE_SERVER_URL}}/signout`, {
        method: 'POST',
        credentials: 'include',
        headers,
    })
        .then((res) => checkServerResponse(res));
}

// функция получения сохранённых фильмов с бэкенда, метод GET, требует наличия JWT

export const getSavedMovies = async (jwt) => {
    return fetch(`${BASE_SERVER_URL}/movies`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            ...headers,
            'Authorization': `Bearer ${jwt}`,
        }
    }).then((res) => checkServerResponse(res));
};

// функция загрузки контента пользователя, требует наличия JWT, метод GET

export const getUserInfo = async (jwt) => {
    return fetch(`${BASE_SERVER_URL}/users/me`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            ...headers,
            'Authorization': `Bearer ${jwt}`,
        }
    }).then((res) => checkServerResponse(res));
};

// функция редактирования информации о пользователе, метод FETCH

export const updateUserInfo = async (data, jwt) => {
    return fetch(`${BASE_SERVER_URL}/users/me`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
            ...headers,
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
        }),
    }).then((res) => checkServerResponse(res));
};

// функция сохранения фильиа на бэкенде, метод POST, даннные берутся из объекта movie

export const saveMovie = async (movie, jwt) => {
    return fetch(`${BASE_SERVER_URL}/movies`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            ...headers,
            'Authorization': `Bearer ${jwt}`,
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: MOVIES_SERVER + movie.image.url,
            trailerLink: movie.trailerLink,
            thumbnail: MOVIES_SERVER + movie.image.formats.thumbnail.url,
            movieId: movie.id,
            nameRU: movie.nameRU || movie.nameEN,
            nameEN: movie.nameEN || movie.nameRU,
        }),
    }).then((res) => checkServerResponse(res));
};

// функция удаления фильма из БД на бэкенде по его id, метод DELETE

export const deleteMovie = async (id, jwt) => {
    return fetch(`${BASE_SERVER_URL}/movies/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            ...headers,
            'Authorization': `Bearer ${jwt}`,
        },
    }).then((res) => checkServerResponse(res));
};
