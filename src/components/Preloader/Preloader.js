import React from 'react'
import './Preloader.css'

// компонент принимает пропс isLoading, влияющий на его показ на странице

const Preloader = ({isLoading}) => {
    return isLoading && (
        <div className="preloader">
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
    )
};

export default Preloader;
