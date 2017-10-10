import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

import { DaySchedule } from './day-schedule';

import { getWeekDays } from './../../utils/date';

const formatDays = (date, schedule, isHighlighted) => {
    const result = [];
    const days = getWeekDays(date);

    if (schedule) {
        for (let index = 0; index < days.length; index++) {
            if (schedule[index]) {
                result.push({
                    isHighlighted,
                    date: days[index],
                    lessons: schedule[index],
                });
            }
        }
    }
    return result;
};

// Данная функция проходит по всем элементам массива и преобразует их
function renderWeek(days) {
    // Здесь мы инициализируем массив, в который будем складывать изменные элементы
    const result = [];

    // Используем цикл `for` для прохода по массиву - он более наглядный и подходит для обучения
    for (let i = 0; i < days.length; i++) {
        // Получаем элемент из массива по текущему индексу. Этот элемент мы и будем изменять.
        const day = days[i];
        
        // Здесь мы проверяем, заполнен ли данный элемент данными
        // (пустые данные тоже данные, но для показа они нам не нужны)
        if (day) {
            // Изменяем элемент как нам надо
            // Сейчас мы никак не используем переменную `day`, это должны сделать вы сами
            const changedElement = <Text>Здесь должен быть компонент "Расписание на день" (DaySchedule)</Text>;
            // И, наконец, мы добавляем измененный элемент в конец результирующего массива
            result.push(changedElement);
        }
    }

    // ...и выводим результат
    return result;
}

export const Schedule = (props) => {
    const schedule = props.isNumerator ? props.numerator : props.denominator;
    const days = formatDays(props.date, schedule, props.isHighlighted);

    return <Text>Я - компонент "Расписание" (Schedule). Замени эту строку в коде</Text>;
};

Schedule.propTypes = {
    numerator: PropTypes.array.isRequired,
    denominator: PropTypes.array.isRequired,
    isNumerator: PropTypes.bool.isRequired,
    isHighlighted: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
};
