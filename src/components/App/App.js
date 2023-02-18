import './App.css';
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";

import Main from '../Main.js';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import InfoTooltip from "../InfoTooltip/InfoTooltip";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import {
  register,
  authorize,
  getContent,
  updateUserInfo,
  saveMovie,
  deleteMovie,
  getSavedMovies,
  logout
} from "../../utils/MainApi";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleTokenCheck();
  }, [isLoggedIn]);

  const handleRegistration = async ({ name, email, password }) => {
    return register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const handleAuthorization = async (data) => {
    return authorize(data)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem('jwt', data.token);
        navigate('/movies');
        Promise.all([getContent(data.token), getSavedMovies(data.token)])
          .then(([userInfo, userMovies]) => {
            setCurrentUser(userInfo);
            localStorage.setItem('savedMovies', JSON.stringify(userMovies));
            setSavedMovies(userMovies);
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            setIsLoading(false);
          })
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      });
  };

  const handleSaveMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    const handledMovie = savedMovies.find(item => {
      return item.movieId === movie.id
    });
    const isLiked = Boolean(handledMovie);
    const id = handledMovie ? handledMovie._id : null;
    if (isLiked) {
      deleteMovie(id, jwt)
        .then(() => {
          const updatedSavedMovies = savedMovies.filter(item => id !== item._id);
          localStorage.setItem('savedMovies', updatedSavedMovies);
          setSavedMovies(updatedSavedMovies);
        })
        .catch(error => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      saveMovie(movie, jwt)
        .then((newSavedMovie) => {
          setSavedMovies((prev) => [...prev, newSavedMovie]);
          setIsLoading(false);
        })
        .catch((error) => {
          setPopupMessage(error);
          setIsPopupOpen(true);
        })
    }
  };

  const handleDeleteMovie = (movie) => {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    deleteMovie(movie._id, jwt)
      .then(() => {
        const updatedSavedMovies = savedMovies.filter(item => movie._id !== item._id);
        localStorage.setItem('savedMovies', updatedSavedMovies);
        // setSavedMovies(updatedSavedMovies);
        setSavedMovies(prev => updatedSavedMovies);
      })
      .catch(error => {
        setPopupMessage(error);
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMessage();
  };

  const handleUpdateUser = (newUserInfo) => {
    const jwt = localStorage.getItem('jwt');
    setIsLoading(true);
    updateUserInfo(newUserInfo, jwt)
      .then((data) => {
        setCurrentUser(data);
        setPopupMessage('Профиль успешно отредактирован!');
        setIsPopupOpen(true);
      })
      .catch(error => {
        setPopupMessage('При обновлении профиля произошла ошибка.');
        setIsPopupOpen(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

    // const handleSignOut = () => {
    //   const jwt = localStorage.getItem('jwt');
    //   logoutUser(jwt);
    //   localStorage.clear();
    //   setCurrentUser({});
    //   setPopupMessage('');
    //   setSavedMovies([]);
    //   setIsLoggedIn(false);
    //   console.log('logout');
    //   navigate('/');
    // };

  const handleSignOut = () => {
    logout()
      .then(() => {
        setIsLoggedIn(false)
        localStorage.clear();
        setCurrentUser({});
        setPopupMessage();
        navigate('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  const handleTokenCheck = () => {
    const path = location.pathname;
    const jwt = localStorage.getItem('jwt');
    getContent(jwt)
      .then((data) => {
        setIsLoggedIn(true);
        setCurrentUser(data)
        navigate(path);
      })
      .catch((err) => console.log(err));
    getSavedMovies(jwt)
      .then((movies) => {
        setSavedMovies(movies)
      })
      .catch((err) => console.log(err));
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main loggedIn={isLoggedIn} />} />
          <Route exact path="/signup" element={
            !isLoggedIn ? (
              <Register onRegister={handleRegistration} />
            ) : (
              <Navigate to="/" />
            )} />
          <Route exact path="/signin" element={
            !isLoggedIn ? (
              <Login onLogin={handleAuthorization} />
            ) : (
              <Navigate to="/" />
            )} />
          <Route exact path='/movies' element={
            isLoggedIn ? (
              <Movies
                loggedIn={isLoggedIn}
                savedMovies={savedMovies}
                onLoading={setIsLoading}
                isLoading={isLoading}
                onSave={handleSaveMovie}
                onDelete={handleDeleteMovie}
                setPopupMessage={setPopupMessage}
                setIsPopupOpen={setIsPopupOpen} />
            ) : (
              <Navigate to="/" />
            )} />
          <Route exact path='/saved-movies' element={
            isLoggedIn ? (
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
          <Route exact path='/profile' element={
            isLoggedIn ? (
              <Profile
                loggedIn={isLoggedIn}
                onUpdateUser={handleUpdateUser}
                onSignOut={handleSignOut}
              />) : (
              <Navigate to="/" />
            )} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <InfoTooltip
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          message={popupMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
