import React from "react";
import './Popup.css';

// компонент принимает пропсы isOpen (состояние попапа), onPopupClose (функция закрытия попапа), msg (сообщение в попапе)

const Popup = ({ isOpen, onPopupClose, msg }) => {
    return (
        <section className={`popup ${isOpen && 'popup_opened'}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-button" onClick={onPopupClose} />
                {/* убираем кавычки из JSON */}
                <p>{JSON.stringify(msg).replace(/["']/g, "")}</p>
            </div>
        </section>
    );
};

export default Popup;