import React from 'react';

// для хранения данных о пользователе используется глобальная стейт-переменная, созданная с помощью createContext

const CurrentUserContext = React.createContext();

export default CurrentUserContext;