import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";

interface Props {
  username: string;
  avatar_url: string;
  chatTopics: string;
}

export default function WaitingRoomCard({
  username,
  avatar_url,
  chatTopics,
}: Props) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar_url }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.header}>{username}</Text>
        <Text>{chatTopics}</Text>
        <Pressable>
          <Text style={styles.button}>💬 Chat</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    textAlign: "right",
    color: orange,
    marginTop: 15,
    marginRight: 5,
  },
  container: {
    backgroundColor: lightBlue,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderRadius: 25,
    width: "90%",
    minHeight: 150,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 30,
  },
  header: {
    color: blue,
    marginBottom: 8,
    fontSize: 20,
  },
  image: {
    resizeMode: "cover",
    height: 90,
    width: 90,
    borderRadius: 50,
    marginBottom: 25,
    marginLeft: 15,
    marginTop: 25,
    marginRight: 15,
  },
  textContainer: {
    flexDirection: "column",
    width: "60%",
    marginTop: 15,
    marginBottom: 20,
  },
});
