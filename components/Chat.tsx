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
  Image,
  ImageBackground,
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
import GetHelpPlaceholder from "./getHelpPlaceholder";
import { WaitingUser } from "../types";

interface Message {
  message: string;
  from?: string;
  to?: string | null;
}

function chat() {
  const ActiveChatState = useContext(ActiveChat);
  const ProChatsState = useContext(ProChats);
  const LoggedInUserState = useContext(LoggedInUserContext);
  const [userMessage, setUserMessage] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [activeChats, setActiveChats] = useState<WaitingUser[]>([]);

  useEffect(() => {
    if (LoggedInUserState?.loggedInUser !== null) {
      socket.emit("getOldMessages");
    } else {
      socket.emit("getTalkingTo");
    }

    socket.on("talkingTo", (res) => {
      setActiveChats(res);
    });

    socket.on("oldMessages", ({ messages }) => {
      setChatMessages(messages);
      if (messages.length !== 0) {
        const active =
          messages[0].to === socket.connectionID
            ? messages[0].from
            : messages[0].to;
        ActiveChatState?.setActiveChat(active);
      }
    });

    socket.on("message", (res) => {
      if (LoggedInUserState?.loggedInUser !== null) {
        const active = res.from === socket.connectionID ? res.to : res.from;
        ActiveChatState?.setActiveChat(active);
        socket.emit("matched", { from: res.from });
      }
      setChatMessages((currMessages) => [...currMessages, res]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  const timeStamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let proChats: string[] | null = null;
  if (ProChatsState !== null && ProChatsState.proChats !== null) {
    proChats = ProChatsState.proChats;
  }

  if (ProChatsState === null) return null;

  if (
    LoggedInUserState?.loggedInUser !== null &&
    ActiveChatState?.activeChat === null &&
    !isWaiting
  ) {
    return <JoinWaitingRoom setIsWaiting={setIsWaiting} />;
  }

  if (
    LoggedInUserState?.loggedInUser !== null &&
    ActiveChatState?.activeChat === null &&
    isWaiting
  ) {
    return <GetHelpPlaceholder />;
  }

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.container}>
        {LoggedInUserState?.loggedInUser === null && (
          <View style={styles.chats}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {activeChats.map((user) => {
                return (
                  <Pressable key={user.connectionID}
                    onPress={() => {
                      socket.emit("getHelpChat", user.connectionID);
                      ActiveChatState?.setActiveChat(user.connectionID);
                    }}
                  >
                    <ImageBackground
                      imageStyle={{ borderRadius: 50 }}
                      style={{
                        height: 80,
                        width: 80,
                        marginHorizontal: 5,
                        shadowColor: black,
                        shadowOpacity: 0.25,
                        shadowRadius: 3,
                      }}
                      source={{ uri: user.avatar_url }}
                    ></ImageBackground>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        )}
        <View style={styles.chatContainer}>
          <ScrollView>
            {chatMessages.map((message, index) => {
              if (message.to !== socket.connectionID) {
                return (
                  <OutgoingMessage key={index}
                    messageBody={message.message}
                    timeStamp={timeStamp}
                  />
                );
              } else {
                return (
                  <IncomingMessage key={index}
                    messageBody={message.message}
                    timeStamp={timeStamp}
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
                setUserMessage("");

                if (ActiveChatState) {
                  const message: Message = {
                    message: userMessage,
                    to: ActiveChatState?.activeChat,
                  };

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
  chats: {
    height: 110,
    margin: 8,
    marginTop: 30,
    minWidth: "100%",
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
    paddingTop: 40,
    minHeight: "75%",
    maxHeight: "90%",
    width: "100%",
  },
  chatInput: {
    width: "80%",
    fontSize: 18,
  },
});

export default chat;
