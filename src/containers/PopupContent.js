import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formatDate  from 'date-fns/format';

import {
    setIsNumeratorOdd,
    selectGroup,
    selectUniversity,
} from './../store/actions';

import { PopupContent } from './../components/popup-content';

const getIsWeekOdd = date => (0 + formatDate(date, 'W')) % 2 === 0;

const getIsNumeratorOdd = (date, isNumeratorOdd) => getIsWeekOdd(date) === isNumeratorOdd;

const mapStateToProps = state => ({
    ...state.settings,
    universitiesList: state.settings.universitiesList,
    groupsList: state.settings.groupsList[state.settings.selectedUniversity] || [],
    isSelectedWeekNumerator: getIsNumeratorOdd(state.date.date, state.date.isNumeratorOdd),
});

const mapDispatchToProps = (dispatch, ...rest) => bindActionCreators({
    switchIsSelectedWeekNumerator: setIsNumeratorOdd,
    onUniversitySelect: selectUniversity,
    onGroupSelect: selectGroup,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PopupContent);