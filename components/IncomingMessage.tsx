import { View, Text, StyleSheet } from "react-native";
import { orange, white } from "../assets/colours";

interface Props {
    messageBody: String;
    timeStamp: String;
}

function IncomingMessage({messageBody, timeStamp}: Props) {
    return (
        <View style={styles.chatBubble}>
            <Text style={styles.messageText}>{messageBody}</Text>
            <Text style={styles.time}>{timeStamp}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    chatBubble: {
        alignSelf: "flex-end",
        backgroundColor: orange,
        borderRadius: 25,
        flexDirection: "row",
        margin: 10,
        maxWidth: "90%",
        padding: 10,
        paddingHorizontal: 15,
    },
    messageText: {
        color: white,
        fontSize: 18,
        marginRight: 10
    },
    time: {
        marginTop: 4,
        fontSize: 14,
        color: "#eee",
        opacity: 0.6,
    },
})

export default IncomingMessage;