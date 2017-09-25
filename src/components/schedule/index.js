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
                    date: days[index],
                    schedule: schedule[index],
                    isHighlighted: isHighlighted,
                });
            }
        }
    }
    return result;
};

export const Schedule = (props) => {
    const schedule = props.isNumerator ? props.numerator : props.denominator;
    const days = formatDays(props.date, schedule, props.isHighlighted);

    return null;
};

Schedule.propTypes = {
    numerator: PropTypes.array.isRequired,
    denominator: PropTypes.array.isRequired,
    isNumerator: PropTypes.bool.isRequired,
    isHighlighted: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
};