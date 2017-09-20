import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeMenu } from './../store/actions';

import Menu from './../components/side-menu';

const mapStateToProps = (state) => ({
    opened: state.menu.isOpened,
});

const mapDispatchToProps = dispatch => bindActionCreators({ onClose: closeMenu }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Menu);