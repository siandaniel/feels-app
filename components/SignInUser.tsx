import { View, StyleSheet, ScrollView, Text } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UserCredential } from "firebase/auth";
import { getUser } from "../utils/utils";
import { white } from "../assets/colours";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { loggedInProfessional, loggedInUser } from "../types";
import { LoggedInProfessionalContext } from "../contexts/LoggedInProfessional";
import { socket } from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActiveChat } from "../contexts/ActiveChats";

interface Props {
  hidden: boolean;
  firebaseSignIn: (a: string, b: string) => Promise<UserCredential>;
}

const SignInUser = ({ hidden, firebaseSignIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const loggedInUserState = useContext(LoggedInUserContext);
  let setLoggedInUser: Dispatch<SetStateAction<loggedInUser | null>>;
  const loggedInProfessionalState = useContext(LoggedInProfessionalContext);
  const activeChatState = useContext(ActiveChat);
  let setActiveChat: Dispatch<SetStateAction<string | null>>;

  if (loggedInUserState !== null) {
    setLoggedInUser = loggedInUserState.setLoggedInUser;
  }

  if (activeChatState) {
    setActiveChat = activeChatState.setActiveChat;
  }

  const submitHandler = () => {
    return getUser(username)
      .then(async (res) => {
        await firebaseSignIn(res.email, password);
        setLoggedInUser(res);
        loggedInProfessionalState?.setLoggedInProfessional(null);
        return res;
      })
      .then(async (res) => {
        setError(false);
        const sessionID = await AsyncStorage.getItem(`${username}Session`);
        if (sessionID) {
          socket.auth = { sessionID, username: res.username };
          socket.connect();
        } else {
          socket.auth = { username: res.username, waiting: false };
          socket.connect();
        }

        socket.on(
          "session",
          ({
            sessionID,
            connectionID,
            isWaiting,
            talkingTo,
            isProfessional,
          }) => {
            socket.auth = { sessionID };
            if (talkingTo !== null) {
              setActiveChat(talkingTo);
            }
            AsyncStorage.setItem(`${username}Session`, `${sessionID}`);
            socket.connectionID = connectionID;
            socket.isProfessional = isProfessional;
          }
        );
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <Text style={styles.text}>Log in as a user</Text>
      <ScrollView contentContainerStyle={styles.inputContainer}>
        <FormInput
          value={username}
          label="???? Username"
          placeholder="Username"
          onChange={setUsername}
        />
        <FormInput
          value={password}
          label="???? Password"
          placeholder="Password"
          secure
          onChange={setPassword}
        />
        {error ? (
          <Text style={styles.message}>Username or password incorrect</Text>
        ) : null}
      </ScrollView>
      <LoginPressable text="Log in" onPress={submitHandler} isPrimary />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  inputContainer: {
    paddingBottom: 24,
  },
  text: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: white,
    textAlign: "center",
    paddingBottom: 24,
  },
  message: {
    marginTop: 8,
    marginLeft: 16,
    color: white,
  },
  hidden: { display: "none" },
});

export default SignInUser;
