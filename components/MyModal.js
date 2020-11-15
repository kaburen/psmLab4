import React from "react";
import {Modal, StyleSheet, Text, TouchableOpacity, View} from "react-native";

class MyModal extends React.Component {
    render() {
        return <Modal transparent={true}
                      visible={this.props.visible}>
            <View style={styles.modalView}>
                <View><Text style={{fontSize: 24}}>Error: {this.props.errMess}</Text></View>
                <TouchableOpacity style={styles.openButton}
                                  onPress={this.props.onPress}>
                    <Text>Continue</Text>
                </TouchableOpacity>
            </View>
        </Modal>;
    }
}

const styles = StyleSheet.create({
    modalView: {
        backgroundColor: "#D4D4D2",
        padding: 30,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        position: "absolute",
    },
    openButton: {
        backgroundColor: "#FF9500",
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        justifyContent: "center",
    },
})
export default MyModal