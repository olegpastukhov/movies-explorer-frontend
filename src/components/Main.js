import React from 'react';
import Header from "./Header/Header";
import Promo from './Promo/Promo';
import NavTab from './NavTab/NavTab';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import Footer from './Footer/Footer';

// компонет принимает пропс loggedIn из App, передаёт его в header

function Main({ loggedIn }) {
  return (
    <>
      <Header loggedIn={loggedIn}/>
      <main>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  )
};

export default Main;

