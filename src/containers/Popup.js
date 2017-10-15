import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closePopup } from './../store/actions';

import { Popup } from './../components/popup';

const mapStateToProps = (state) => ({
    opened: state.popup.isOpened,
});

const mapDispatchToProps = dispatch => bindActionCreators({ onClose: closePopup }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Popup);