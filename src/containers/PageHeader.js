import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openMenu, openPopup } from './../store/actions';

import PageHeader from './../components/page-header';

const mapStateToProps = (state) => ({
    title: state.search.keyword || 'Расписание',
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
    onMenuPress: openMenu,
    onSettingsPress: openPopup,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);