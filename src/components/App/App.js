import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';

// импортируем компоненты

import Main from '../Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Popup from '../Popup/Popup.js';

// импортируем контекст пользователя

import CurrentUserContext from "../../contexts/CurrentUserContext";

// импортируем функции MainApi

import { register, authorize, logout, getUserInfo, updateUserInfo, saveMovie, deleteMovie, getSavedMovies } from "../../utils/MainApi";

function App() {

  // стейты, связанные с попапом

  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // обработчик закрытия попапа

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage('');
  };

  // стейты, связанные с пользователем

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  // стейт загрузки данных 

  const [isLoading, setIsLoading] = useState(false);

  // стейт сохранённых фильмов (массив)

  const [savedMovies, setSavedMovies] = useState([]);

  // хуки useNavigate и useLocation

  const navigate = useNavigate();
  const location = useLocation();

  // обработчик регистрации пользователя, принмает name, email, password, далее автоматически идёт авторизация

  const handleUserRegistration = async ({ name, email, password }) => {
    return register({ name, email, password })
      .then(() => {
        handleUserAuthorization({ email, password });
      })
      .catch(err => {
        setPopupMessage(`Произошла ошибка: ${err}`);
        setIsPopupOpen(true);
      });
  };

  // обработчик авторизации пользователя. Обращение к API, создание локальных хранилищ jwt и savedMovies

  const handleUserAuthorization = async (data) => {
    return authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token); // токен хранится в localstorage
        navigate('/movies'); // автоматическая переадресация на страницу movies
        Promise.all([getUserInfo(data.token), getSavedMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo); // данные записываются в глобальную стейт-переменную
            localStorage.setItem('savedMoviesFromServer', JSON.stringify(userMovies));
            setSavedMovies(userMovies);
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => {
            setIsLoading(false);
          })
      })
      .catch(err => {
        setPopupMessage(`Произошла ошибка: ${err}`);
        setIsPopupOpen(true);
      });
  };

  // обработчик изменения данных пользователя, обращение к API, 

  const handleUpdateUserInfo = (newUserInfo) => {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    updateUserInfo(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage('Информация о пользователе успешно обновлена!');
        setIsPopupOpen(true);
      })
      .catch(err => {
        setPopupMessage(`Произошла ошибка: ${err}`);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // обработчик выхода пользователя из аккаунта, обращение к API, очистка локального хранилища

  const handleUserSignOut = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false)
        localStorage.clear(); // удаление данных из localstorage
        setCurrentUser({});
        setPopupMessage('');
        navigate('/'); // переадресация на главную страницу
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  // обработчик сохранения фильма, поиск в локальном хранилище, обращение к API. Если фильм есть в хранилище - удаление.

  const handleSaveMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie); // если фильм isLiked, удаляем из хранилища
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id, jwt)
        .then(() => {
          const handledSavedMovies = savedMovies.filter(item => id !== item._id);
          localStorage.setItem('savedMoviesFromServer', handledSavedMovies);
          setSavedMovies(handledSavedMovies);
        })
        .catch(err => {
          setPopupMessage(`Произошла ошибка: ${err}`);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      saveMovie(movie, jwt)
        .then((newMovie) => {
          setSavedMovies((saved) => [...saved, newMovie]); // иначе добавляем в массив
          setIsLoading(false);
        })
        .catch((err) => {
          setPopupMessage(`Произошла ошибка: ${err}`);
          setIsPopupOpen(true);
        })
    }
  };

  // обработчик удаления фильма, обращение к API, обновление хранилища savedMovies

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    deleteMovie(movie._id, jwt)
      .then(() => {
        const handledSavedMovies = savedMovies.filter(item => movie._id !== item._id);
        localStorage.setItem('savedMoviesFromServer', handledSavedMovies);
        setSavedMovies(handledSavedMovies);
      })
      .catch(err => {
        setPopupMessage(`Произошла ошибка: ${err}`);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // обработчик проверки токена пользователя

  const handleUserTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    const path = location.pathname;
    getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data)
        navigate(path); // получаем данные пользователя
      })
      .catch((err) => console.log(err));
    getSavedMovies(jwt)
      .then((data) => {
        setSavedMovies(data); // установка стейта
      })
      .catch((err) => console.log(err));
  };

  // эффект проверки токена пользователя

  useEffect(() => { handleUserTokenCheck(); }, [isLoggedIn]);

  // закрытие попапа нажатием клавиши Esc

  useEffect(() => {
    if (setIsPopupOpen) {
      function handlePressEsc(evt) {
        if (evt.key === 'Escape') {
          handleClosePopup();
        }
      }
      document.addEventListener('keydown', handlePressEsc);
      return () => {
        document.removeEventListener('keydown', handlePressEsc);
      }
    }
  }, [isPopupOpen]);
  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={isLoggedIn} />} />
          <Route exact path="/signup" element={<Register onRegister={handleUserRegistration} />} />
          <Route path="/signin" element={<Login onLogin={handleUserAuthorization} />} />
          <Route path="/movies" element={isLoggedIn ? (
            <Movies
              loggedIn={isLoggedIn}
              onSave={handleSaveMovie}
              onDelete={handleDeleteMovie}
              setPopupMessage={setPopupMessage}
              setIsPopupOpen={setIsPopupOpen}
              savedMovies={savedMovies}
              onLoading={setIsLoading}
              isLoading={isLoading}
            />
          ) : (
            <Navigate to="/" />
          )} />
          <Route path="/saved-movies" element={isLoggedIn ? (
            <SavedMovies
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              isLoading={isLoading}
              onDelete={handleDeleteMovie}
              setPopupMessage={setPopupMessage}
              setIsPopupOpen={setIsPopupOpen}
            />) : (
            <Navigate to="/" />
          )} />
          <Route path="/profile" element={isLoggedIn ? (
            <Profile
              loggedIn={isLoggedIn}
              onUpdateUserInfo={handleUpdateUserInfo}
              onSignOut={handleUserSignOut}
            />) : (
            <Navigate to="/" />
          )} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Popup
          isOpen={isPopupOpen}
          onPopupClose={handleClosePopup}
          msg={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;

