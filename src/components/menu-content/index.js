import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Image, StyleSheet } from 'react-native';

import Link from './Link';
import List from './List';

const MenuContent = ({lectors, lessons, onLectorPress, onLessonPress, onSchedulePress}) => (
    <View style={ styles.wrapper } >
        <Image
            source={require('./../../../assets/background.png')}
            resizeMode="cover"
            style={ styles.image }
        />
        <ScrollView style={ styles.scrollWrapper } >
            <Link onPress={ onSchedulePress }>
                <View><Text style={ styles.listHeader } >Список</Text></View>
            </Link>
            {
                lectors && lectors.length ? <List items={ lectors } onPress={onLectorPress}>
                    Преподаватели
                </List> : null
            }
            {
                lessons && lessons.length ? <List items={ lessons } onPress={onLessonPress}>
                    Предметы
                </List> : null
            }
        </ScrollView>
    </View>
);

export default MenuContent;

MenuContent.propTypes = {
    lectors: PropTypes.arrayOf(PropTypes.string),
    lessons: PropTypes.arrayOf(PropTypes.string),
    onLectorPress: PropTypes.func.isRequired,
    onLessonPress: PropTypes.func.isRequired,
    onSchedulePress: PropTypes.func.isRequired,
};

MenuContent.defaultProps = {
    lectors: [],
    lessons: [],
};

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '100%',
        height: '100%',
    },
    scrollWrapper: {
        padding: 5,
        paddingLeft: 20,
    },
    image: {
        maxHeight: 200,
    },
    listHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    }
});