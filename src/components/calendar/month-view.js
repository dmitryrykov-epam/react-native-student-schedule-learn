import React from 'react';
import PropTypes from 'prop-types';
import { View, Text,  StyleSheet, TouchableHighlight } from 'react-native';

import isSameWeek from 'date-fns/is_same_week';

import Day from './day';

import { weekConfig, getDatePeriod, getWeekDays, getMonthDaysWithAdditionalDays,  } from './../../utils/date';

const generateKeyForWeekArray = week => `week:${week[0].toISOString().slice(0, 10)}-${week[week.length - 1].toISOString().slice(0, 10)}`;
const generateKeyForDay = day => `day:${day.toISOString().slice(0, 10)}`;

const RenderWeek = ({ week, currentDay, onSelect, isDayHighlightedFn }) => {
    const isCurrentWeek = isSameWeek(week[0], currentDay, weekConfig);
    const handleWeekClick = isCurrentWeek ? () => false : () => onSelect(week[3]);

    return (
        <TouchableHighlight onPress={ handleWeekClick } activeOpacity={0.7} underlayColor='#fff' >
            <View style={ [styles.weekRow, isCurrentWeek ? styles.currentWeek : null ] } >
                { week.map(date => (
                    <Day
                        day={ date }
                        currentDay={ currentDay }
                        key={ generateKeyForDay(date) }
                        highlight={ isDayHighlightedFn(date) }
                    />
                )) }
            </View>
        </TouchableHighlight>
    );
}

export default class CalendarMonthView extends React.PureComponent {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        onSelectWeek: PropTypes.func.isRequired,
        isDayHighlightedFn: PropTypes.func.isRequired,
    }

    render() {
        const { date } = this.props;
        const weeks = getMonthDaysWithAdditionalDays(date).reduce(
            (acc, next, index) => {
                if (index % 7 === 0) {
                    return [...acc, [next]];
                }
                acc[acc.length - 1].push(next);
                return acc;
            },
            [],
        );

        return (
            <View style={ styles.wrapper }>
                {
                    weeks.map(week => (
                        <RenderWeek
                            key={ generateKeyForWeekArray(week) }
                            week={ week }
                            currentDay={ date }
                            onSelect={ this.props.onSelectWeek }
                            isDayHighlightedFn={ this.props.isDayHighlightedFn }
                        />
                    ))
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    weekRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 3,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#00000000'
    },
    currentWeek: {
        borderColor: '#aaa',
        borderWidth: 1,
        borderStyle: 'solid',
    },
});