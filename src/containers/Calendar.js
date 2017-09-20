import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setDate } from './../store/actions';

import Calendar from './../components/calendar';

const mapStateToProps = (state) => ({
    date: state.date.date,
    isDayHighlightedFn: (date) => false,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onChange: setDate,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
