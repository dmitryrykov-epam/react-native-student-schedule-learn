import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Lesson from './lesson';

import { formatDate } from './../../utils/date';

const DaySchedule = ({ isHightlighted, date, lessons }) => null;

export default DaySchedule;

DaySchedule.propTypes = {
    isHightlighted: PropTypes.func.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    lessons: PropTypes.arrayOf(PropTypes.object).isRequired,
}
