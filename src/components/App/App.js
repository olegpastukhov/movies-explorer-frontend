import React, { useState } from "react";
import { Route, Routes } from 'react-router-dom';

import Main from '../Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Popup from '../Popup/Popup.js';

function App() {

  // стейты, связанные с попапом

  const [popupMessage, setPopupMessage] = useState('Произошла ошибка. Всем срочно покинуть здание');
  const [isPopupOpen, setIsPopupOpen] = useState(true);

  // обработчик закрытия попапа

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Popup
        isOpen={isPopupOpen}
        onPopupClose={handlePopupClose}
        msg={popupMessage}
      />
    </div>
  )
}

export default App;

