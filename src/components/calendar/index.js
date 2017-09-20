import React from 'react';
import PropTypes from 'prop-types';
import { View, Text,  StyleSheet, TouchableHighlight, Image } from 'react-native';

import addMonths from 'date-fns/add_months';
import subMonths from 'date-fns/sub_months';
import addWeeks from 'date-fns/add_weeks'
import subWeeks from 'date-fns/sub_weeks';

import { getMonthAlias } from './../../utils/date';

import WeekView from './week-view';
import MonthView from './month-view';

export default class Calendar extends React.Component {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        onChange: PropTypes.func.isRequired,
        isDayHighlightedFn: PropTypes.func.isRequired,
    }

    state = {
        isWeekView: false,
    }

    handleExpandClick = () => this.setState({ isWeekView: !this.state.isWeekView });

    handleClickPrev = () => {
        const fn = this.state.isWeekView ? subWeeks : subMonths;
        this.props.onChange(fn(this.props.date, 1));
    }

    handleClickNext = () => {
        const fn = this.state.isWeekView ? addWeeks : addMonths;
        this.props.onChange(fn(this.props.date, 1));
    }

    render() {
        const view = this.state.isWeekView ?
            <WeekView date={ this.props.date } isDayHighlightedFn={ this.props.isDayHighlightedFn } /> :
            <MonthView
                date={ this.props.date }
                onSelectWeek={ date => this.props.onChange(date) }
                isDayHighlightedFn={ this.props.isDayHighlightedFn }
            />;

        return (
            <View style={ styles.wrapper }>
                <TouchableHighlight activeOpacity={0.7} onPress={ this.handleClickPrev } underlayColor='#fff'>
                    <View style={ styles.arrowWrapper }>
                        <Image source={require('./../../../assets/arrow-left.png')} />
                    </View>
                </TouchableHighlight>
                <View style={ styles.calendarView }>
                    <Text style={ styles.header } >
                        { getMonthAlias(this.props.date.getMonth()).toLocaleUpperCase() }, { this.props.date.getFullYear() }
                    </Text>
                    { view }
                    <TouchableHighlight activeOpacity={0.7} onPress={ this.handleExpandClick } underlayColor='#fff'>
                        <View style={ styles.expandArrowWrapper }>
                            {
                                this.state.isWeekView ? 
                                    <Image source={require('./../../../assets/arrow-down.png')} />:
                                    <Image source={require('./../../../assets/arrow-up.png')} />
                            }
                        </View>
                    </TouchableHighlight>
                </View>
                <TouchableHighlight activeOpacity={0.7} onPress={ this.handleClickNext } underlayColor='#fff'>
                    <View style={ styles.arrowWrapper }>
                        <Image source={require('./../../../assets/arrow-right.png')} />
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        overflow: 'hidden',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        elevation: 5,
    },
    arrowWrapper: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    arrow: {
        fontSize: 36,
        color: '#666666'
    },
    calendarView: {
        flex: 1,
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'stretch',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
    },
    expandArrowWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});