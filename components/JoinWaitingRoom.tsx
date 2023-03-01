import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Text, TextInput, View, Image, Pressable, StyleSheet, Keyboard, Button, Linking } from "react-native";
import { blue, orange, white } from "../assets/colours";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { socket } from "../utils/socket";

const image = require('../assets/talk_to_a_professional.jpg');

interface Props {
    setIsWaiting: Dispatch<SetStateAction<boolean>>
}

function JoinWaitingRoom({setIsWaiting}: Props) {
    const LoggedInUserState = useContext(LoggedInUserContext)
    const [userMessage, setUserMessage] = useState<string>("");

    const userToAdd = {
        username: LoggedInUserState?.loggedInUser?.username,
        avatar_url: LoggedInUserState?.loggedInUser?.avatar_url,
        chatTopics: userMessage
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>All the Feels?</Text>
            <Text style={styles.subheading}>Looking for support?</Text>
            <Image source={image} style={styles.image}></Image>
            <Text style={styles.text}>Let us know what you want to discuss, click 'Get Help' and we'll have a registered professional get in touch with you within 24 hours!</Text> 
            <TextInput placeholder="Whats on your mind?" style={styles.textbox} selectionColor={orange} value={userMessage} onChangeText={setUserMessage} multiline={true} onBlur={() => {
                Keyboard.dismiss()}}></TextInput>
            <Pressable style={styles.submitButton} onPress={() =>{
                socket.emit("waiting")
                setIsWaiting(true)
                }}>
                
                <Text style={styles.submitButtonText} >Get Help</Text>
            </Pressable>
            <Text style={styles.text}>Is it an Emergency?</Text>
            <Button title="Go to Mental health crisis helplines" color={white} onPress={() => Linking.openURL("https://www.mind.org.uk/information-support/guides-to-support-and-services/crisis-services/helplines-listening-services/")}></Button>
        </View>
    );
}
 
const styles = StyleSheet.create ({
    container: {
        backgroundColor: blue,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingTop: 40,
        height: "100%"
    },
    heading: {
        color: white,
        fontSize: 40,
        fontWeight: "bold"
    },
    subheading: {
        color: white,
        fontSize: 28,
        fontWeight: "bold",
    },
    image: {
        borderRadius: 150,
        height: 200,
        margin: 30,
        width: 200
    },
    submitButton: {
        marginBottom: 23,
        backgroundColor: orange,
        padding: 10,
        marginTop: 8,
        paddingHorizontal: 15,
        borderRadius: 30,
    },
    submitButtonText: {
        fontSize: 20,
        color: white,
    },
    textbox: {
        backgroundColor: "#fff",
        borderRadius: 30,
        margin: 17,
        paddingTop: 11,
        padding: 14,
        fontSize: 18,
        width: "90%"
    },
    text: {
        color: white,
        fontSize: 19,
        textAlign: "center",
        width: "85%"
    }
})

export default JoinWaitingRoom;