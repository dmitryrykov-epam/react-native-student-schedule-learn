import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, ActivityIndicator, BackHandler } from 'react-native';
import { bindActionCreators } from 'redux';

import {
    requestSchedule,
    loadIsNumeratorOdd,
    clearSearch,
    closeMenu,
    openPopup,
} from './../store/actions';

import Menu from './Menu';
import MenuContent from './MenuContent';
import PageHeader from './PageHeader';
import Calendar from './Calendar';
import Schedule from './Schedule';
import Popup from './Popup';
import PopupContent from './PopupContent';

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
        university: PropTypes.string,
        group: PropTypes.string,
        openPopup: PropTypes.func.isRequired,
    }

    componentWillMount = () => {
        this.props.loadIsNumeratorOdd();
        this.requestShedule(this.props.university, this.props.group);
        BackHandler.addEventListener("hardwareBackPress", this.handleBackButtonPress);
    };

    componentDidMount = () => {
        if (!(this.props.university && this.props.group)) {
            this.props.openPopup();
        }
    }

    componentWillReceiveProps = (props) => {
        const { university, group } = this.props;
        if ( university !== props.university || group !== props.group) {
            this.requestShedule(props.university, props.group);
        }
    }
    
    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackButtonPress);
    }
    
    requestShedule = (university, group) => {
        if (university && group) {
            this.props.onRefresh(university, group);
        }
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
                <PopupContent />
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
    university: state.settings.selectedUniversity,
    group: state.settings.selectedGroup,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    openPopup,
    loadIsNumeratorOdd,
    clearSearch,
    closeMenu,
    onRefresh: requestSchedule,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
