import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';

import Day from './day';

import { getWeekDays } from './../../utils/date';

export default class CalendarWeekView extends React.PureComponent {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        isDayHighlightedFn: PropTypes.func.isRequired,
    };

    render() {
        return (
            <View style={ styles.wrapper } >
                { getWeekDays(this.props.date).map(date => (
                    <Day
                        day={ date }
                        currentDay={ this.props.date }
                        key={`wday:${date.toISOString().slice(0, 10)}`}
                        highlight={ this.props.isDayHighlightedFn(date) }
                    />
                )) }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'center',
    },
});