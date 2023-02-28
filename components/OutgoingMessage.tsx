import { View, Text, StyleSheet } from "react-native";
import { black, orange, white } from "../assets/colours";

interface Props {
    messageBody: String;
    timeStamp: String;
}

function OutgoingMessage({messageBody, timeStamp}: Props) {
    return (
        <View style={styles.chatBubble}>
            <Text style={styles.time}>{timeStamp}</Text>
            <Text style={styles.messageText}>{messageBody}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    chatBubble: {
        backgroundColor: white,
        borderRadius: 25,
        flexDirection: "row",
        margin:10,
        maxWidth: "85%",
        padding: 10,
        paddingHorizontal: 15,
    },
    messageText: {
        color: black,
        fontSize: 18,
        marginLeft: 10,
        maxWidth: "90%"
    },
    time: {
        marginTop: 4,
        fontSize: 14,
        color: "#bbb",
    },
})

export default OutgoingMessage;