import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from "./components/button";
export default function App() {
    return (
        <View style={styles.container}>
            <View style={styles.resultContainer}>
                <Text style={styles.resultTexT}>0</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <View style={styles.buttonsRow}>
                    <Button doubleButton>0</Button>
                    <Button>,</Button>
                    <Button actionButton actionText>=</Button>
                </View>
                <View style={styles.buttonsRow}>
                    <Button>1</Button>
                    <Button>2</Button>
                    <Button>3</Button>
                    <Button actionButton actionText>+</Button>
                </View>
                <View style={styles.buttonsRow}><Button>4</Button>
                    <Button>5</Button>
                    <Button>6</Button>
                    <Button actionButton actionText>-</Button>
                </View>
                <View style={styles.buttonsRow}>
                    <Button>7</Button>
                    <Button>8</Button>
                    <Button>9</Button>
                    <Button actionButton actionText>x</Button>
                </View>
                <View style={styles.buttonsRow}>
                    <Button>AC</Button>
                    <Button isDisabled doubleButton> </Button>
                    <Button actionButton actionText>/</Button>
                </View>
            </View>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#454545',
    },
    buttonsContainer: {
        flex: 4,
        flexWrap: 'wrap',
        flexDirection: 'column-reverse',
    },
    resultContainer: {
        flex: 1.5,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    resultTexT: {
        fontSize: 84,
        color: 'white',
        paddingHorizontal: 10,
    },
    buttonsRow: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#D4D4D2',
        borderColor: '#000',
        borderTopWidth: 1,
    },
});