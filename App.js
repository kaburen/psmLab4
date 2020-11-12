import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Button from "./components/button";
import calculate from "./utils/calcOperations";
import {factorial} from 'mathjs';

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
                    <View style={styles.buttonsRow}>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'pi')}>π</Button>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'x3')}>x³</Button>
                        <Button doubleButton fun={() => this.handleKeys("digit", 0)}>0</Button>
                        <Button fun={() => this.handleKeys("comma")}>,</Button>
                        <Button actionButton fun={() => this.handleKeys("port")}>=</Button>
                    </View>
                    <View style={styles.buttonsRow}>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'e')}>e</Button>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'x2')}>x²</Button>
                        <Button fun={() => this.handleKeys("digit", 1)}>1</Button>
                        <Button fun={() => this.handleKeys("digit", 2)}>2</Button>
                        <Button fun={() => this.handleKeys("digit", 3)}>3</Button>
                        <Button actionButton fun={() => this.handleKeys("operator",'+')}>+</Button>
                    </View>
                    <View style={styles.buttonsRow}>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'ln')}>ln</Button>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'log10')}>log10</Button>
                        <Button fun={() => this.handleKeys("digit", 4)}>4</Button>
                        <Button fun={() => this.handleKeys("digit", 5)}>5</Button>
                        <Button fun={() => this.handleKeys("digit", 6)}>6</Button>
                        <Button actionButton fun={() => this.handleKeys("operator",'-')}>-</Button>
                    </View>
                    <View style={styles.buttonsRow}>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'ex')}>e×</Button>
                        <Button isHidden extraButton fun={() => this.handleKeys("land",'10x')}>10×</Button>
                        <Button fun={() => this.handleKeys("digit", 7)}>7</Button>
                        <Button fun={() => this.handleKeys("digit", 8)}>8</Button>
                        <Button fun={() => this.handleKeys("digit", 9)}>9</Button>
                        <Button actionButton fun={() => this.handleKeys("operator",'*')}>x</Button>
                    </View>
                    <View style={styles.buttonsRow}>
                        <Button isHidden extraButton fun={() => this.handleKeys("operator",'sqrt')}>x√y</Button>
                        <Button isHidden extraButton fun={() => this.handleKeys( "land",'x!')}>x!</Button>
                        <Button fun={() => this.handleKeys("AC")}>AC</Button>
                        <Button isHidden fun={() => this.handleKeys("sign")}>+/-</Button>
                        <Button isHidden fun={() => this.handleKeys("land",'%')}>%</Button>
                        <Button isDisabled doubleButton> </Button>
                        <Button actionButton fun={() => this.handleKeys("operator",'/')}>÷</Button>
                    </View>
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