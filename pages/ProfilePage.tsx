import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import { blue, white, orange } from "../assets/colours";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { loggedInUser } from "../types";
import { getUser, getUserMoods } from "../utils/utils";
import { todaysDate } from "../utils/todaysDate";
import {
  useState,
  useEffect,
  useContext,
  SetStateAction,
  Dispatch,
} from "react";

export default function ProfilePage() {
  const loggedInUserState = useContext(LoggedInUserContext);
  let loggedInUser: loggedInUser | null = null;
  let setLoggedInUser: Dispatch<SetStateAction<loggedInUser | null>>;

  if (loggedInUserState !== null) {
    loggedInUser = loggedInUserState.loggedInUser;
    setLoggedInUser = loggedInUserState.setLoggedInUser;
  }

  if (loggedInUser === null) {
    return null;
  }

  return (
    <View style={styles.page}>
      <Text style={styles.hello}> Hello, {loggedInUser.username}!</Text>
      <Image source={{ uri: loggedInUser.avatar_url }} style={styles.image} />
      <Text style={styles.text}>Email: {loggedInUser.email}</Text>
      <Text style={styles.text}>Member Since: {loggedInUser.date_joined}</Text>
      {/* <Text style={styles.text}>Last Active: {loggedInUser.updatedAt}</Text> */}
      <Pressable style={styles.logout} onPress={() => setLoggedInUser(null)}>
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  hello: {
    marginBottom: 20,
    color: white,
    fontSize: 30,
  },
  image: {
    resizeMode: "cover",
    height: 230,
    width: 230,
    borderRadius: 150,
    marginBottom: 30,
  },
  logout: {
    backgroundColor: orange,
    height: 30,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 50,
  },
  logoutText: {
    color: white,
  },
  page: {
    backgroundColor: blue,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: white,
    fontSize: 20,
    marginBottom: 20,
  },
});
