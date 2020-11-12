import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from "./components/button";
import calculate from "./utils/calcOperations";
import {ButtonsData} from "./assets/ButtonsData"

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            result: 0,
            part: '',
            operation: '',
        };
    }

    handleKeys = (operation, value) => {
        this.setState((state) => calculate(operation, value, state))
    }

    render() {
        const {result} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTexT}>{result}</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    {ButtonsData.map(row => (
                        <View style={styles.buttonsRow}>
                            {row.map(item => (
                                <Button
                                    isDisabled={item.isDisabled}
                                    isHidden={item.isHidden}
                                    doubleButton={item.doubleButton}
                                    actionButton={item.actionButton}
                                    extraButton={item.extraButton}
                                    fun={() => {
                                        this.handleKeys(item.operation, item.value);
                                    }}>
                                    {item.name}
                                </Button>
                            ))}
                        </View>
                    ))}
                </View>
            </View>
        );
    }
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
        fontSize: 64,
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