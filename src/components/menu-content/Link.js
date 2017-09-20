import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableHighlight } from 'react-native';

const Link = ({ onPress, children }) => (
    <TouchableHighlight onPress={onPress} activeOpacity={0.7} underlayColor='#fff' >
        { children }
    </TouchableHighlight>
);

export default Link;

Link.propTypes = {
    children: PropTypes.node.isRequired,
    onPress: PropTypes.func.isRequired,
}
