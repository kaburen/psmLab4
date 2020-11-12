import React from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity} from "react-native";


class Button extends React.Component {

    constructor() {
        super();
        this.state = {
            orientation: ''
        };
    }

    getOrientation = () => {
        if (Dimensions.get('window').width < Dimensions.get('window').height) {
            this.setState({orientation: 'port'});
        } else {
            this.setState({orientation: 'land'});
        }
    };

    componentDidMount() {
        Dimensions.addEventListener('change', this.getOrientation);
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.getOrientation);
    }

    render() {
        const {children, doubleButton, actionButton, isDisabled, isHidden, fun, extraButton} = this.props
        return (
            (!isHidden || this.state.orientation === 'land') && <TouchableOpacity
                style={[styles.singleButton,
                    (isDisabled && this.state.orientation === 'land') && styles.emptyButton,
                    doubleButton && styles.doubleButton,
                    actionButton && styles.actionButton,
                    extraButton && styles.extraButton,
                ]}
                disabled={isDisabled && true}
                onPress={fun}
            >
                <Text style={[styles.buttonsText,
                    actionButton && styles.actionText,
                ]}>{children}</Text></TouchableOpacity>
        )
    }


}

const styles = StyleSheet.create({
    singleButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
    },
    actionButton: {
        backgroundColor: '#FF9500',
    },
    actionText: {
        color: "#FFF",
    },
    buttonsText: {
        fontSize: 28,
    },
    doubleButton: {
        flex: 2,
        flexBasis: 2,
    },
    emptyButton: {
        display: 'none',
    },
    extraButton: {
        backgroundColor: "#9F9F9F",
    },
})

export default Button