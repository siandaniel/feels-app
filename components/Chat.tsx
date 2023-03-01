import {
  ScrollView,
  Button,
  Text,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { black, blue, orange, white } from "../assets/colours";
import { Feather } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import { socket } from "../utils/socket";
import { ActiveChat } from "../contexts/ActiveChats";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JoinWaitingRoom from "./JoinWaitingRoom";
import { ProChats } from "../contexts/ProChats";

interface Message {
  message: string;
  from?: string;
  to?: string | null;
}

function chat() {
  const ActiveChatState = useContext(ActiveChat);
  const ProChatsState = useContext(ProChats)
  const LoggedInUserState = useContext(LoggedInUserContext);
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("getOldMessages")

    socket.on("oldMessages", (res) => {
      setChatMessages(res);
    })

    socket.on("message", (res) => {
      console.log(res);
      console.log(res.to, "THIS MF");
        if (!socket.isProfessional) {
        ActiveChatState?.setActiveChat(res.from);
        socket.emit("matched", { from: res.from });
      }
      setChatMessages((currMessages) => [...currMessages, res]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  let proChats: string[] | null = null 
  if (ProChatsState !== null && ProChatsState.proChats !== null) {
    proChats = ProChatsState.proChats
  }

  if (
    LoggedInUserState?.loggedInUser !== null &&
    ActiveChatState?.activeChat === null
  ) {
    return (
      <JoinWaitingRoom/>
    );
  }
  return (
    <KeyboardAvoidingView behavior="padding"> 
      <View style={styles.container}>
      {LoggedInUserState?.loggedInUser === null && proChats !== null && <View>
        {proChats.map((chat) => {
          return <Button title={chat} onPress={() => {
            socket.emit("getHelpChat", chat)
          }}></Button>
        })}
        </View>} 
        <View style={styles.chatContainer}>
          <ScrollView>
            {chatMessages.map((message) => {
              if (message.to !== socket.connectionID) {
                return (
                  <OutgoingMessage
                    messageBody={message.message}
                    timeStamp="14:27"
                  />
                );
              } else {
                return (
                  <IncomingMessage
                    messageBody={message.message}
                    timeStamp="14:27"
                  />
                );
              }
            })}
          </ScrollView>
          <View style={styles.chatbox}>
            <TextInput
              style={styles.chatInput}
              selectionColor={orange}
              value={userMessage}
              onChangeText={setUserMessage}
              placeholder="Aa"
              multiline={true}
              onBlur={() => {
                Keyboard.dismiss();
              }}
            ></TextInput>
            <Pressable
              onPress={() => {
                setUserMessage("")
                
                if (ActiveChatState) {
                  const message: Message = {
                    message: userMessage,
                    to: ActiveChatState?.activeChat,
                  };
                  console.log(message.to, "THIS BITCH");
                  
                  setChatMessages((currMessages) => [...currMessages, message]);
                  socket.emit("message", {
                    message: userMessage,
                    to: ActiveChatState.activeChat,
                  });
                }
              }}
            >
              <Feather name="send" size={24} color={orange} />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: blue,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    height: "100%",
  },
  chatbox: {
    backgroundColor: "#fff",
    borderRadius: 30,
    margin: 17,
    flexDirection: "row",
    padding: 14,
    justifyContent: "space-around",
  },
  chatContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
    marginTop: 40,
    paddingTop: 40,
    minHeight: "88%",
    maxHeight: "90%",
    width: "100%",
  },
  chatInput: {
    width: "80%",
    fontSize: 18,
  },
});

export default chat;
