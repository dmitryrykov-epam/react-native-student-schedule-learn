import React from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, Text, View } from 'react-native';

import store from './src/store';

import App from './src/containers/App';
/**
 * This component needed by `react-redux`.
 */
export default () => <Provider store={ store } ><App /></Provider>;
