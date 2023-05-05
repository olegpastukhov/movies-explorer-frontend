import React from "react";
import './Popup.css';

const Popup = ({ isOpen, onPopupClose, msg }) => {
    return (
        <section className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-button" onClick={onPopupClose} />
                <p>{JSON.stringify(msg).replace(/["']/g, "")}</p>
            </div>
        </section>
    );
};

export default Popup;