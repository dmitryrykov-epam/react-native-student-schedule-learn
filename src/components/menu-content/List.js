import React from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

import Link from './Link';

export default class List extends React.PureComponent {
    static propTypes = {
        items: PropTypes.arrayOf(PropTypes.string).isRequired,
        children: PropTypes.node.isRequired,
        onPress: PropTypes.func.isRequired,
    }

    state = {
        isOpened: false,
    }

    handleClick = () => this.setState({ isOpened: !this.state.isOpened });

    render = () => (
        <View>
            <Link onPress={ this.handleClick } >
                <View><Text style={ styles.listHeader } >{ this.props.children }</Text></View>
            </Link>
            { this.state.isOpened && <View style={ styles.innerWrapper } >
                { this.props.items.map(item => (
                    <Link onPress={ () => this.props.onPress(item) } key={ item }>
                        <View><Text style={ styles.listItem } >{ item }</Text></View>
                    </Link>
                )) }
            </View> }
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {

    },
    innerWrapper: {
        paddingLeft: 20,
    },
    listHeader: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    listItem: {
        fontSize: 16,
    }
});