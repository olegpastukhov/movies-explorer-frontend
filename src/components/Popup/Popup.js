import React from 'react';
import './Popup.css';

// компонент принимает пропсы isOpen (состояние попапа), onPopupClose (функция закрытия попапа), popupMessage (сообщение в попапе)

const Popup = ({ isOpen, onPopupClose, popupMessage }) => {
    return (
        <section className={`popup ${isOpen && "popup_opened"}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-button" onClick={onPopupClose} />
                {/* убираем кавычки из JSON */}
                <p>{JSON.stringify(popupMessage).replace(/["']/g, "")}</p>
            </div>
        </section>
    );
};

export default Popup;