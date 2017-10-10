import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

export const Lesson = () => (
    <Text>Я - компонент "Занятие" (Lesson). Замени эту строку в коде</Text>
);

Lesson.propTypes = {
    index: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    rooms: PropTypes.arrayOf(PropTypes.string).isRequired,
    highlight: PropTypes.bool.isRequired,
};