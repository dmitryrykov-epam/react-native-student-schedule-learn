import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import formatDate  from 'date-fns/format';

import {
    setIsNumeratorOdd,
} from './../store/actions';

import { PopupContent } from './../components/popup-content';

const getIsWeekOdd = date => (0 + formatDate(date, 'W')) % 2 === 0;

const getIsNumeratorOdd = (date, isNumeratorOdd) => getIsWeekOdd(date) === isNumeratorOdd;

const mapStateToProps = state => ({
    isSelectedWeekNumerator: getIsNumeratorOdd(state.date.date, state.date.isNumeratorOdd),
});

const mapDispatchToProps = (dispatch, ...rest) => bindActionCreators({
    switchIsSelectedWeekNumerator: isNum => setIsNumeratorOdd(isNum),
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PopupContent);