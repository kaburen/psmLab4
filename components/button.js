import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";


class Button extends React.Component{
    render() {
        const {children, doubleButton, actionButton, isDisabled, actionText} = this.props
        return(
            <TouchableOpacity disabled = {isDisabled && true}
                style={[styles.singleButton,
                    doubleButton && styles.doubleButton,
                    actionButton && styles.actionButton,
                ]}>
                <Text style={[styles.buttonsText,
                    actionText && styles.actionText,
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
    actionText:{
        color: "#FFF",
    },
    buttonsText: {
        fontSize: 36,
    },
    doubleButton:{
        flex: 2,
        flexBasis: 2,
    },
})

export default Button