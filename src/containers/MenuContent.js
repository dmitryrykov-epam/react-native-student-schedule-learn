import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearSearch, searchLector, searchLesson } from './../store/actions';

import MenuContent from './../components/menu-content';

const mapStateToProps = (state) => ({
    lectors: state.search.lectors,
    lessons: state.search.lessons,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    onLectorPress: searchLector,
    onLessonPress: searchLesson,
    onSchedulePress: clearSearch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);
