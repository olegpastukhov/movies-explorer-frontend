import React from 'react';
import "./AboutProject.css";

// компонент не принимает пропсы, не содержит логики

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <div className="about-project__table">
                <div className="about-project__cell">
                    <h3 className="about-project__heading">Дипломный проект включал 5 этапов</h3>
                    <span className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности 
                    и финальные доработки.</span>
                </div>
                <div className="about-project__cell">
                    <h3 className="about-project__heading">На выполнение диплома ушло 5 недель</h3>
                    <span className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, 
                    чтобы успешно защититься.</span>
                </div>
            </div>
            <div>
                <div className="about-project__progress-bar">
                    <div className="about-project__backend">1 неделя</div>
                    <div className="about-project__frontend">4 недели</div>
                </div>
                <div className="about-project__progress-bar-labels">
                    <div className="about-project__backend-label">Back-end</div>
                    <div className="about-project__frontend-label">Front-end</div>
                </div>
            </div>
        </section>
    )
};

export default AboutProject;