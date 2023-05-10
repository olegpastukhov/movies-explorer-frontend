import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';

// импортируем компоненты

import Main from '../Main.js';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import Movies from '../Movies/Movies';
import Popup from '../Popup/Popup.js';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

// импортируем контекст пользователя

import CurrentUserContext from "../../contexts/CurrentUserContext";

// импортируем функции MainApi

import { register, authorize, logout, getUserInfo, updateUserInfo, saveMovie, deleteMovie, getSavedMovies } from "../../utils/MainApi";

// импортируем getMovies из moviesApi

import { getMovies } from '../../utils/MoviesApi';

// импортируем константу

import { SHORT_MOVIE_DURATION } from '../../utils/constants.js';

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

  // обработчик авторизации пользователя. Обращение к API, создание локальных хранилищ jwt и savedMoviesFromServer

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
    const movieSaved = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isMovieLiked = Boolean(movieSaved);
    const id = movieSaved ? movieSaved._id : null;

    // если фильм уже сохранён, удаляем из хранилища

    if (isMovieLiked) {
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

      // иначе добавляем в массив

      saveMovie(movie, jwt)
        .then((newMovie) => {
          setSavedMovies((saved) => [...saved, newMovie]);
          setIsLoading(false);
        })
        .catch((err) => {
          setPopupMessage(`Произошла ошибка: ${err}`);
          setIsPopupOpen(true);
        })
    }
  };

  // обработчик удаления фильма, обращение к API, обновление хранилища savedMoviesFromServer

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

  // функционал Movies

  // фильтр фильмов согласно запросу

  const filterMovies = (movies, query, checkbox) => {
    const moviesFound = movies.filter((movie) => {
      const movieNameRu = String(movie.nameRU).toLowerCase().trim(); // записываем русское название в нижнем регистре в переменную
      const movieNameEn = String(movie.nameEN).toLowerCase().trim(); // записываем английское название в нижнем регистре в переменную
      const queryMovie = query.toLowerCase().trim(); // записываем текст запроса в нижнем регистре в переменную
      return movieNameRu.indexOf(queryMovie) !== -1 || movieNameEn.indexOf(queryMovie) !== -1; // при совпадении добавляем в moviesFound
    });

    if (checkbox) {
      return moviesFound.filter(movie => movie.duration < SHORT_MOVIE_DURATION);
    } else {
      return moviesFound;
    }
  }

  // стейт начального массива фильмов

  const [initMoviesList, setInitMoviesList] = useState([]);
  const [filteredMoviesList, setFilteredMoviesList] = useState([]);

  // обработчик поискового запроса

  const handleSetFoundMovies = (movies, query, checkbox) => {

    // локально отфильтровываем фильмы согласно запросу

    const foundMoviesList = filterMovies(movies, query, false);

    // если ничего не найдено - открывается попап с сообщением

    if (foundMoviesList.length === 0) {
      setPopupMessage('Ничего не найдено :)');
      setIsPopupOpen(true);
    }

    // устанавливаем стейт initMoviesList

    setInitMoviesList(foundMoviesList);

    // устанавливаем стейт filteredMoviesList в зависимости от состояния чекбокса

    setFilteredMoviesList(checkbox ? (foundMoviesList.filter(movie => movie.duration < SHORT_MOVIE_DURATION)) : foundMoviesList);


    // создаём локальное хранилище foundMovies

    localStorage.setItem('foundMovies', JSON.stringify(foundMoviesList));
  };

  // стейт состояния чекбокса и массива фильмов с Api

  const [shortMoviesFilter, setShortMoviesFilter] = useState(false);
  const [moviesFromServer, setMoviesFromServer] = useState([]);

  // обработчик массива короткометражек

  const handleShortMoviesList = () => {
    setShortMoviesFilter(!shortMoviesFilter);
    if (!shortMoviesFilter) {
      setFilteredMoviesList(initMoviesList.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
      if (filteredMoviesList.length === 0) {
      }
    } else {
      setFilteredMoviesList(initMoviesList);
    }
    localStorage.setItem('shortMoviesFilter', !shortMoviesFilter); // сохраняем состояние чекбокса в хранилище
  };

  // обработчик поискового запросов

  const handleMovieSearchSubmit = (value) => {
    if (!value || value.trim().length === 0) {
      setPopupMessage('Пожалуйста, введите ключевое слово.'); // сообщение в попапе при попытке пустого запроса
      setIsPopupOpen(true);
      return;
    }

    localStorage.setItem('lastSearch', value); // записываем поисковое слово в хранилище
    localStorage.setItem('shortMoviesFilter', shortMoviesFilter); // записываем состояние чекбокса в хранилище 

    // если фильмы с Api не получены - получаем, сохраняем в хранилище moviesFromServer
    // и передаём обработчику поискового запроса

    if (moviesFromServer.length === 0) {
      setIsLoading(true);
      getMovies()
        .then(movies => {
          localStorage.setItem('moviesFromServer', JSON.stringify(movies));
          setMoviesFromServer(movies);
          handleSetFoundMovies(
            movies,
            value,
            shortMoviesFilter
          );
        })
        .catch((err) => {
          setPopupMessage(`Упс! Произошла ошибка: ${err}`);
          setIsPopupOpen(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      handleSetFoundMovies(moviesFromServer, value, shortMoviesFilter);
    }
  }

  // функционал savedMovies

  // стейт состояния чекбокса

  const [shortSavedMoviesFilter, setShortSavedMoviesFilter] = useState(false);

  // обработчик короткометражек

  const handleSavedShortMoviesList = () => {
    if (!shortSavedMoviesFilter) {
      setShortSavedMoviesFilter(true);
      localStorage.setItem('shortSavedMoviesFilter', true); // сохраняем состояние чекбокса в хранилище
      setShowedSavedMoviesList(filteredSavedMoviesList.filter(movie => movie.duration < SHORT_MOVIE_DURATION));
    } else {
      setShortSavedMoviesFilter(false);
      localStorage.setItem('shortSavedMoviesFilter', false); // и здесь тоже, но false
      setShowedSavedMoviesList(filteredSavedMoviesList);
    }
  }

  // стейты массивов фильмов и поискового запроса

  const [showedSavedMoviesList, setShowedSavedMoviesList] = useState(savedMovies);
  const [filteredSavedMoviesList, setFilteredSavedMoviesList] = useState(showedSavedMoviesList);
  const [querySavedMovie, setQuerySavedMovie] = useState('');

  // обработчик сабмита формы поиска по сохранённым фильмам

  const handleSavedMovieSearchSubmit = (value) => {
    if (!value || value.trim().length === 0) {
      setPopupMessage('Пожалуйста, введите ключевое слово.'); // сообщение при пустом запросе
      setIsPopupOpen(true);
      return;
    }

    const movies = filterMovies(savedMovies, value, shortSavedMoviesFilter);
    setQuerySavedMovie(value);

    if (movies.length === 0) {
      setPopupMessage('Ничего не найдено :)');
      setIsPopupOpen(true);
    } else {
      setFilteredSavedMoviesList(movies);
      setShowedSavedMoviesList(movies);
    }
  }

  // обработчик проверки токена пользователя

  const handleUserTokenCheck = () => {
    const jwt = localStorage.getItem('jwt'); // достаём токен из хранилища
    const path = location.pathname;
    getUserInfo(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data) // получаем данные пользователя
        navigate(path); 
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
              onShortMoviesFilter={setShortMoviesFilter}
              onFilteredMoviesList={setFilteredMoviesList}
              onInitMoviesList={setInitMoviesList}
              onSearchMovies={handleMovieSearchSubmit}
              shortMoviesFilter={shortMoviesFilter}
              onFilter={handleShortMoviesList}
              filteredMoviesList={filteredMoviesList}
              savedMovies={savedMovies}
              isLoading={isLoading}
            />
          ) : (
            <Navigate to="/" />
          )} />
          <Route path="/saved-movies" element={isLoggedIn ? (
            <SavedMovies
              onDelete={handleDeleteMovie}
              savedMovies={savedMovies}
              loggedIn={isLoggedIn}
              isLoading={isLoading}
              onShortSavedMoviesFilter={setShortSavedMoviesFilter}
              onShowedSavedMoviesList={setShowedSavedMoviesList}
              filterMovies={filterMovies}
              query={querySavedMovie}
              onSearchMovies={handleSavedMovieSearchSubmit}
              onFilter={handleSavedShortMoviesList}
              shortSavedMoviesFilter={shortSavedMoviesFilter}
              showedSavedMoviesList={showedSavedMoviesList}
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
          popupMessage={popupMessage}
          onPopupClose={handleClosePopup}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
