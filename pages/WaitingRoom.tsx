import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { socket } from "../utils/socket";

function WaitingRoom() {

    const [users, setUsers] = useState<string[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");
    socket.on("users", (res) => {
        setUsers(res)
    })

    return (
        <View style={styles.page}>
            <Text>Welcome to the waiting room</Text>
            <Button title="Refresh" onPress={() => {
              socket.emit("refresh")
            }}></Button>
            <View>
              {users.map((user) => (
                <Pressable onPress={() => {
                  socket.emit("message", {message: "Yo!", recipient: user})
                }}>
                  <Text>{user}</Text>
                </Pressable>
              ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
      marginTop: 60,
    },
  });
  

export default WaitingRoom;