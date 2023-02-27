import { ScrollView, Text, StyleSheet, View, TextInput, Pressable, Keyboard } from "react-native";
import { black, blue, orange, white } from "../assets/colours";
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { socket } from "../utils/socket";

function chat() {

    useEffect(() => {
        socket.on("message", (res) => {
            console.log(res);
        })
    })

    const [userMessage, setUserMessage] = useState<string>("");
    socket.on("users", (res) => {
        console.log(res);   
    })

    return (
        <View style={styles.container}>
            <View style={styles.chatContainer}>
                <ScrollView style={{flexDirection: "column-reverse"}}>
                    <IncomingMessage messageBody="Hello" timeStamp={"14:37"}/>
                    <OutgoingMessage messageBody="How can I help you today?" timeStamp={"14:39"}/>
                </ScrollView>
                <View style={styles.chatbox}>
                    <TextInput style={styles.chatInput} selectionColor={orange} value={userMessage} onChangeText={setUserMessage} placeholder="Aa" multiline={true} onBlur={() => {
                        Keyboard.dismiss()
                    }}></TextInput>
                    <Pressable onPress={() => {
                        console.log("Pressed");
                        socket.emit("message", {message: userMessage, recipient: socket.id})
                    }}>
                        <Feather name="send" size={24} color={orange} />
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: blue,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 20,
      height: "100%"
    },
    chatbox: {
        backgroundColor: "#fff",
        borderRadius: 30,
        margin: 17,
        flexDirection: "row",
        padding: 14,
        justifyContent: "space-around"
    },
    chatContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderRadius: 30,
        marginTop: 40,
        minHeight: "88%",
        width: "100%"
    },
    chatInput: {
        width: "80%",
        fontSize: 18,
    }
  });

export default chat;