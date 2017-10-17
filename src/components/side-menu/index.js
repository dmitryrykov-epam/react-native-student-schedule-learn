import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView, Image, StyleSheet, Animated, TouchableWithoutFeedback, Easing } from 'react-native';

export default class SideMenu extends React.PureComponent {
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
            width: props.opened ? new Animated.Value(1) : new Animated.Value(0),
            isDisplayed: props.opened,
        }
        
        this.animationOpen = Animated.spring(
            this.state.width,
            {
                toValue: 1,
                useNativeDriver: true,
                friction: 9,
            }
        );

        this.animationClose = Animated.timing(
            this.state.width,
            {
                toValue: 0,
                useNativeDriver: true,
                duration: 200,
                easing: Easing.ease,
            }
        );

        this.translationInterpolation = this.state.width.interpolate({
            inputRange: [0, 1],
            outputRange: [-300, 0],
        });

        this.opacityInterpolation = this.state.width.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.5],
        });
    }


    componentWillReceiveProps = (props) => {
        if (this.props.opened != props.opened) {
            const fn = props.opened ? this.handleOpen : this.handleClose;
            fn();
        }
    }

    handleOpen = () => {
        this.state.width.stopAnimation();
        this.setState({ isDisplayed: true });
        this.animationOpen.start();
    }
    
    handleClose = () => {
        this.state.width.stopAnimation();
        this.animationClose.start(() => this.setState({ isDisplayed: false }));
    }

    render = () => {
        const wrapperStyles = StyleSheet.flatten([
            styles.wrapper,
            { display: this.state.isDisplayed ? 'flex' : 'none' },
        ]);

        const animatedStyles = StyleSheet.flatten([
            styles.animatedWrapper,
            { transform: [{ translateX: this.translationInterpolation }]}
        ]);

        const backdropStyles = StyleSheet.flatten([
            styles.backdrop,
            { opacity: this.opacityInterpolation },
        ]);

        return (
            <TouchableWithoutFeedback onPress={ this.props.onClose } >
                <View style={ wrapperStyles } >
                    <Animated.View style={ backdropStyles } ></Animated.View>
                    <TouchableWithoutFeedback onPress={ () => undefined } >
                        <Animated.View style={ animatedStyles } >
                            { this.props.children }
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        )
    };
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        overflow: 'hidden',
        elevation: 100
    },
    animatedWrapper: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden',
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: 300,
        zIndex: 5,
        elevation: 5,
    },
    backdrop: {
        backgroundColor: '#000000',
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
    }
});
