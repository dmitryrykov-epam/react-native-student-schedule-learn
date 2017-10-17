import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Image, Easing, ScrollView, StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { Constants } from 'expo';

export class Popup extends React.PureComponent {
    static propTypes = {
        opened: PropTypes.bool,
        onClose: PropTypes.func,
        children: PropTypes.node.isRequired,
    }

    static defaultProps = {
        opened: false,
        onClose: () => undefined,
    }


    constructor(props) {
        super(props);

        this.state = {
            // animationValue: props.opened ? new Animated.Value(1) : new Animated.Value(0),
            isDisplayed: props.opened,
        }
        
        // this.animationOpen = Animated.spring(
        //     this.state.animationValue,
        //     {
        //         toValue: 1,
        //         useNativeDriver: true,
        //         friction: 9,
        //     }
        // );

        // this.animationClose = Animated.timing(
        //     this.state.animationValue,
        //     {
        //         toValue: 0,
        //         useNativeDriver: true,
        //         duration: 200,
        //         easing: Easing.ease,
        //     }
        // );

        // this.translationInterpolation = this.state.animationValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [-300, 0],
        // });

        // this.opacityInterpolation = this.state.animationValue.interpolate({
        //     inputRange: [0, 1],
        //     outputRange: [0, 0.5],
        // });
    }

    componentWillReceiveProps = (props) => {
        if (this.props.opened != props.opened) {
            const fn = props.opened ? this.handleOpen : this.handleClose;
            fn();
        }
    }

    handleOpen = () => {
        // this.state.animationValue.stopAnimation();
        this.setState({ isDisplayed: true });
        // this.animationOpen.start();
    }
    
    handleClose = () => {
        // this.state.animationValue.stopAnimation();
        // this.animationClose.start(() => this.setState({ isDisplayed: false }));
        this.setState({ isDisplayed: false });
    }

    render = () => {
        const wrapperStyles = StyleSheet.flatten([
            styles.wrapper,
            { display: this.state.isDisplayed ? 'flex' : 'none' },
        ]);

        const popupStyles = StyleSheet.flatten([
            styles.popup,
            // { transform: [{ translateX: this.translationInterpolation }]}
        ]);

        const backdropStyles = StyleSheet.flatten([
            styles.backdrop,
            { opacity: 0.5 },
        ]);

        return (
            <View style={ wrapperStyles } >
                <TouchableWithoutFeedback onPress={ this.props.onClose }>
                    <Animated.View style={ backdropStyles } />
                </TouchableWithoutFeedback>
                <Animated.ScrollView style={ popupStyles } contentContainerStyle={ styles.popupInnerView } >
                    <View style={ styles.contentWrapper } >
                        <View style={ styles.firstLine } >
                            <TouchableHighlight onPress={this.props.onClose} activeOpacity={0.7} underlayColor='#fff'>
                                <Image source={require('./../../../assets/close.png')} />
                            </TouchableHighlight>
                        </View>
                        <View style={ styles.content } >
                            { this.props.children }
                        </View>
                    </View>
                </Animated.ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        zIndex: 150,
        elevation: 150,
        top: 0,
        left: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    backdrop: {
        position: 'absolute',
        backgroundColor: '#666',
        width: '100%',
        height: '100%',
        flex: 1,
        elevation: 10,
        top: 0,
        left: 0,
    },
    popup: {
        padding: 10,
        paddingTop: 10 + Constants.statusBarHeight,
        elevation: 30,
        minWidth: 300,
    },
    popupInnerView: {
        justifyContent: 'center',
        opacity: 1,
        alignItems: 'stretch',
    },
    contentWrapper: {
        padding: 10,
        backgroundColor: '#fefefe',
        width: '100%',
        justifyContent: 'flex-start',
        borderRadius: 10,
    },
    firstLine: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    content: {
        paddingTop: 10,
    },
});
