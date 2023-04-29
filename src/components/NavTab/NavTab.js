import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./NavTab.css";

function NavTab() {
    return (
        <ul className="navtab">
            <li className="navtab__item">
                <Link to="#about-project" className="navtab__link">О проекте</Link>
            </li>
            <li className="navtab__item">
                <Link to="#technologies" className="navtab__link">Технологии</Link>
            </li>
            <li className="navtab__item">
                <Link to="#about-student" className="navtab__link">Студент</Link>
            </li>
        </ul>
    )
};

export default NavTab;