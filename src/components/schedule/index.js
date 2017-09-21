import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

import DaySchedule from './day-schedule';

const Schedule = ({ isNumerator, numerator, denominator, date, isHighlighted }) => {
    const schedule = isNumerator ? numerator : denominator;
    const days = getWeekDays(date)
        .map((day, index) => ({date: day, schedule: schedule && schedule[index] || null, isHighlighted }))
        .filter(({schedule}) => !!schedule);

    return null;
};

export default Schedule;

Schedule.propTypes = {
    numerator: PropTypes.array.isRequired,
    denominator: PropTypes.array.isRequired,
    isNumerator: PropTypes.bool.isRequired,
    isHighlighted: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
};