import { useCallback, useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Button,
  Pressable,
} from "react-native";
import { blue, white } from "../assets/colours";
import WaitingRoomCard from "../components/WaitingRoomCard";
import { ActiveChat } from "../contexts/ActiveChats";
import { ProChats } from "../contexts/ProChats";
import { WaitingUser } from "../types";
import { socket } from "../utils/socket";

function WaitingRoom() {
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<WaitingUser[]>([]);
  const ProChatsState = useContext(ProChats);
  const ActiveChatState = useContext(ActiveChat);

  useEffect(() => {
    socket.on("users", (res) => {
      setUsers(res);
    });

    return () => {
      socket.off("users");
    };
  }, []);

  const onRefresh = useCallback(() => {
    socket.emit("refresh");
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const pressHandler = (user: WaitingUser) => {
    return () => {
      ActiveChatState?.setActiveChat(user.connectionID);
      ProChatsState?.setProChats((currChats) => {
        if (currChats !== null) {
          return [...currChats, user.connectionID];
        } else {
          return currChats;
        }
      });
      socket.emit("addChat", user.connectionID);
    };
  };

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.page}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.text}>Waiting Room</Text>
        {users.map((user) => (
          <WaitingRoomCard
            key={user.connectionID}
            onPress={pressHandler(user)}
            username={user.username}
            avatar_url={user.avatar_url}
            chatTopics={user.chatTopics}
          />
        ))}
      </ScrollView>      
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: blue,
    minHeight: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  scroller: {},
  text: {
    marginBottom: 20,
    color: white,
    fontSize: 25,
  },
});

export default WaitingRoom;
