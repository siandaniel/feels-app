import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import { blue, white, orange, lightBlue } from "../assets/colours";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { LoggedInProfessionalContext } from "../contexts/LoggedInProfessional";
import { loggedInUser, loggedInProfessional } from "../types";
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

  const loggedInProfessionalState = useContext(LoggedInProfessionalContext);
  let loggedInProfessional: loggedInProfessional | null = null;
  let setLoggedInProfessional: Dispatch<
    SetStateAction<loggedInProfessional | null>
  >;

  if (loggedInProfessionalState !== null) {
    loggedInProfessional = loggedInProfessionalState.loggedInProfessional;
    setLoggedInProfessional = loggedInProfessionalState.setLoggedInProfessional;
  }

  if (loggedInUser === null && loggedInProfessional === null) {
    return null;
  }

  if (loggedInUser !== null) {
    return (
      <View style={styles.page}>
        <Text style={styles.hello}> Hello, {loggedInUser.username}!</Text>
        <Image source={{ uri: loggedInUser.avatar_url }} style={styles.image} />
        <Text style={styles.text}>
          <Text style={styles.bold}>✉️ Email: </Text>
          {loggedInUser.email}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>📅 Member Since: </Text>
          {loggedInUser.date_joined}
        </Text>
        <Pressable style={styles.logout} onPress={() => setLoggedInUser(null)}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
    );
  }

  if (loggedInProfessional !== null) {
    return (
      <View style={styles.page}>
        <Text style={styles.helloProf}>
          Hello, {loggedInProfessional.fullName}!
        </Text>
        <Image
          source={{ uri: loggedInProfessional.avatarURL }}
          style={styles.image}
        />
        <Text style={styles.text}>
          <Text style={styles.bold}>✉️ Email: </Text>
          {loggedInProfessional.email}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>📋 Reg Number: </Text>
          {loggedInProfessional.registrationNumber}
        </Text>
        <Text style={styles.hoursTitleIcon}>
          {"🕒 "} <Text style={styles.hoursTitle}>Available Hours:</Text>
        </Text>

        {loggedInProfessional.availableHours.map((day) => {
          const capitalisedDay =
            day.day.substring(0, 1).toUpperCase() + day.day.substring(1);
          return (
            <Text key={day.day} style={styles.hours}>
              {capitalisedDay}: {day.hours[0]}.00 - {day.hours[1]}.00
            </Text>
          );
        })}

        <Pressable
          style={styles.logoutProf}
          onPress={() => setLoggedInProfessional(null)}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bold: {
    color: lightBlue,
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },
  hello: {
    marginBottom: 20,
    color: white,
    fontSize: 30,
  },
  helloProf: {
    marginTop: 25,
    marginBottom: 20,
    color: white,
    fontSize: 30,
  },
  hoursTitle: {
    color: white,
    fontSize: 20,
    marginBottom: 20,
    textDecorationLine: "underline",
    fontStyle: "italic",
  },
  hoursTitleIcon: {
    color: white,
    fontSize: 20,
    marginBottom: 20,
    fontStyle: "italic",
  },
  hours: {
    color: white,
    fontSize: 15,
    fontStyle: "italic",
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 50,
    padding: 10,
    paddingHorizontal: 15,
  },
  logoutProf: {
    backgroundColor: orange,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 30,
    padding: 10,
    paddingHorizontal: 15,
  },
  logoutText: {
    color: white,
    fontSize: 20,
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
