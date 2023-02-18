import React from "react";
import "./Preloader.css";

const Preloader = ({isLoading}) => {
    return isLoading && (
        <div className="preloader">
            <div className="preloader__overlay"></div>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
