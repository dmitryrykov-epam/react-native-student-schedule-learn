import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import isSameMonth from 'date-fns/is_same_month';

export default ({ day, currentDay, highlight }) => (
    <View style={ [ styles.dayWrapper, highlight ? styles.highlight : null ] } >
        <Text style={ isSameMonth(day, currentDay) ? null : styles.anotherMonthDay }>{ day.getDate() }</Text>
    </View>
);

const styles = StyleSheet.create({
    dayWrapper: {
        padding: 2,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    anotherMonthDay: {
        color: '#888',
    },
    highlight: {
        backgroundColor: '#FAFAD2',
    }
})