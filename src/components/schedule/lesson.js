import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

const Lesson = () => null;

export default Lesson;

Lesson.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlight: PropTypes.bool.isRequired,
};