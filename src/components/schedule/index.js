import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, StyleSheet, Text } from 'react-native';

import DaySchedule from './day-schedule';

import { getWeekDays } from './../../utils/date';

export default class Schedule extends React.PureComponent {
    static propTypes = {
        numerator: PropTypes.array.isRequired,
        denominator: PropTypes.array.isRequired,
        isNumerator: PropTypes.bool.isRequired,
        isHighlighted: PropTypes.func.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
    }

    render = () => null;
}
