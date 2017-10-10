import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import { Lesson } from './lesson';

import { formatDate } from './../../utils/date';

export const DaySchedule = (props) => (
    <Text>Я - компонент "Расписание за день" (DaySchedule). Замени эту строку в коде.</Text>
);

DaySchedule.propTypes = {
    isHighlighted: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
}
