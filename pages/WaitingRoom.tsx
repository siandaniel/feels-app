import { useContext, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import { ActiveChat } from "../contexts/ActiveChats";
import { ProChats } from "../contexts/ProChats";
import { socket } from "../utils/socket";

function WaitingRoom() {

    const [users, setUsers] = useState<string[]>([]);
    const [userMessage, setUserMessage] = useState<string>("");
    socket.on("users", (res) => {
        setUsers(res)
    })

    const ProChatsState = useContext(ProChats)

    return (
        <View style={styles.page}>
            <Text>Welcome to the waiting room</Text>
            <Button title="Refresh" onPress={() => {
              socket.emit("refresh")
            }}></Button>
            <View>
              {users.map((user) => (
                <Pressable onPress={() => {
                  ProChatsState?.setProChats((currChats) => {
                    if (currChats !== null) {
                      return [...currChats, user]
                    } else {
                      return currChats
                    }
                  })
                  socket.emit("addChat", user);
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