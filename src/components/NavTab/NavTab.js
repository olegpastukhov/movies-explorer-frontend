import React from "react";
import { HashLink as Link } from 'react-router-hash-link';
import "./NavTab.css";

function NavTab() {
    return (
        <ul className="navtab">
            <li><Link to="#about-project" className="navtab__link">О проекте</Link></li>
            <li><Link to="#tech" className="navtab__link">Технологии</Link></li>
            <li><Link to="#about-me" className="navtab__link">Студент</Link></li>
        </ul>
    )
};

export default NavTab;