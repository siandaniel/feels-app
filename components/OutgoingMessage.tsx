import { View, Text, StyleSheet } from "react-native";
import { black, orange, white } from "../assets/colours";

interface Props {
    messageBody: String;
    timeStamp: String;
}

function OutgoingMessage({messageBody, timeStamp}: Props) {
    return (
        <View>
        <View style={styles.chatBubble}>
            <Text style={styles.time}>{timeStamp}</Text>
            <Text style={styles.messageText}>{messageBody}</Text>
        </View>
        </View>
    );
}

const styles = StyleSheet.create({
    chatBubble: {
        alignSelf: "flex-start",
        backgroundColor: white,
        borderRadius: 25,
        flexDirection: "row",
        margin:10,
        minWidth: "10%",
        maxWidth: "82%",
        padding: 10,
        paddingHorizontal: 17,
    },
    messageText: {
        maxWidth: "86%",
        color: black,
        fontSize: 18,
        marginLeft: 10,
    },
    time: {
        marginTop: 4,
        fontSize: 14,
        color: "#bbb",
    },
})

export default OutgoingMessage;