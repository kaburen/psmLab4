import React from "react";
import {StyleSheet, Text, View} from "react-native";

class Display extends React.Component {
    render() {
        return <View style={styles.resultContainer}>
            <Text adjustsFontSizeToFit numberOfLines ={1} style={styles.resultTexT}>{this.props.result}</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
        resultContainer: {
            flex: 1.5,
            justifyContent: 'flex-end',
            alignItems: 'flex-end'

        },
        resultTexT: {
            fontSize: 56,
            color: 'white',
            paddingHorizontal: 10,
        }
    }
)
export default Display