import { useState, useCallback } from "react";

const useForm = () => {

    // стейты enteredValues, errors, isFormValid

    const [values, setValues] = useState({}); // введённые значения
    const [errors, setErrors] = useState({}); // ошибки
    const [isValid, setIsValid] = useState(false); // валидность формы

    // обработчик вводимых данных

    const handleValueChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setValues({ ...values, [name]: value, }); // добавляем данные к уже введённым
        setErrors({ ...errors, [name]: event.target.validationMessage, }); // добавляем ошибку к имеющимся
        setIsValid(event.target.closest(".form").checkValidity()); // проверка валидности формы
    };

    // обработчик очистки формы: данные, ошибки, проверка валидности

    const handleResetFormData = useCallback(
        (resetValues = {}, resetErrors = {}, resetFormValid = false) => { setValues(resetValues); setErrors(resetErrors); setIsValid(resetFormValid); },
        [setValues, setErrors, setIsValid]
    );

    // возвращаем обработчики и стейты

    return { handleValueChange, handleResetFormData, values, errors, isValid };
};

export default useForm;