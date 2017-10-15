import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, BackHandler } from 'react-native';
import { bindActionCreators } from 'redux';

import { requestSchedule, loadIsNumeratorOdd, clearSearch, closeMenu } from './../store/actions';

import Menu from './Menu';
import MenuContent from './MenuContent';
import PageHeader from './PageHeader';
import Calendar from './Calendar';
import Schedule from './Schedule';
import Popup from './Popup';

const Spinner = () => (
    <View style={ styles.spinnerWrapper }>
        <ActivityIndicator animating color="#FF0000" size="large" />
    </View>
);

class App extends React.PureComponent {
    static propTypes = {
        onRefresh: PropTypes.func.isRequired,
        loadIsNumeratorOdd: PropTypes.func.isRequired,
        clearSearch: PropTypes.func.isRequired,
        closeMenu: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired,
        isSuccess: PropTypes.bool.isRequired,
        isMenuOpened: PropTypes.bool.isRequired,
        isSearching: PropTypes.bool.isRequired,
    }

    componentWillMount = () => {
        this.props.loadIsNumeratorOdd();
        this.props.onRefresh('rsreu', 715);
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonPress);
    };

    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonPress);
    }

    handleBackButtonPress = () => {
        if (this.props.isSearching) {
            this.props.clearSearch();
            return true;
        }
        if (this.props.isMenuOpened) {
            this.props.closeMenu();
            return true;
        }
        return false;
    }

    render = () => (
        <View style={ styles.wrapper } >
            <Menu>
                <MenuContent />
            </Menu>
            <Popup opened >
                <Text>Here it comes the Text</Text>
            </Popup>
            <View style={ styles.page }>
                <PageHeader />
                <Calendar />
                <Schedule />
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
    isMenuOpened: state.menu.isOpened,
    isSearching: !!state.search.keyword,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    loadIsNumeratorOdd,
    clearSearch,
    closeMenu,
    onRefresh: requestSchedule,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
