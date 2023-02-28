import { ScrollView, Text, StyleSheet, View, TextInput, Pressable, Keyboard } from "react-native";
import { black, blue, orange, white } from "../assets/colours";
import { Feather } from '@expo/vector-icons';
import { useContext, useEffect, useState } from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { socket } from "../utils/socket";
import { ActiveChat } from "../contexts/ActiveChats";

function chat() {
    socket.on("message", (res) => {
        console.log(res);
    })
    // useEffect(() => {
    //     socket.on("message", (res) => {
    //         console.log(res);
    //     })
    // })
    const [userMessage, setUserMessage] = useState<string>("");

    const ActiveChatState = useContext(ActiveChat)


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
                        console.log(ActiveChatState?.activeChat);
                        socket.emit("message", {message: userMessage, to: ActiveChatState?.activeChat})
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