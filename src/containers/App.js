import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { bindActionCreators } from 'redux';

import { requestSchedule, loadIsNumeratorOdd } from './../store/actions';

import Menu from './Menu';
import MenuContent from './MenuContent';
import PageHeader from './PageHeader';
import Calendar from './Calendar';
import Schedule from './Schedule';

const Spinner = () => (
    <View style={ styles.spinnerWrapper }>
        <ActivityIndicator animating color="#FF0000" size="large" />
    </View>
);

class App extends React.PureComponent {
    static propTypes = {
        onRefresh: PropTypes.func.isRequired,
        loadIsNumeratorOdd: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        isSuccess: PropTypes.bool.isRequired,
    }

    componentWillMount = () => {
        this.props.loadIsNumeratorOdd();
        this.props.onRefresh('rsreu', 715);
    };

    render = () => (
        <View style={ styles.wrapper } >
            <Menu>
                <MenuContent />
            </Menu>
            <View style={ styles.page }>
                <PageHeader />
                <Calendar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#eeeeee',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    page: {
        flex: 1,
    },
    spinnerWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const mapStateToProps = state => ({
    isFetching: state.schedule.isFetching,
    isSuccess: state.schedule.isSuccess,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadIsNumeratorOdd,
    onRefresh: requestSchedule,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
