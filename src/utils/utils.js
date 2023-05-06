// функция проверки ответа сервера, если всё нормально - возвращаем JSON

export const checkServerResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
}