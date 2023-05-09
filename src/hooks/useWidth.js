import { useEffect, useCallback, useState } from 'react';

// функция возвращает ширину экрана

export const useWidth = () => {
    const getWidth = useCallback(() => window.innerWidth, []); // получаем ширину экрана
    const [width, setWidth] = useState(getWidth()); // устанавливваем стейт width

    useEffect(() => {

        let timer;

        function resizeController() {
            if (!timer) {
                timer = setTimeout(() => {
                    timer = null;
                    handleResize();
                }, 1000); // задержка в 1000 мс
            }
        };

        // обработчик изменения размера экрана

        function handleResize() {
            setWidth(getWidth());
            window.addEventListener('resize', resizeController, false); // добавляем слушатель события resize
        };
        return () => window.removeEventListener('resize', handleResize); // удаляем слушатель события resize
    }, [getWidth]);

    return width;
}