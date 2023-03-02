import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { UserCredential } from "firebase/auth";
import { getPro } from "../utils/utils";
import { white } from "../assets/colours";
import { loggedInProfessional, loggedInUser } from "../types";
import { LoggedInProfessionalContext } from "../contexts/LoggedInProfessional";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { socket } from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProChats } from "../contexts/ProChats";

interface Props {
  hidden: boolean;
  firebaseSignIn: (email: string, password: string) => Promise<UserCredential>;
}

const SignInPro = ({ hidden, firebaseSignIn }: Props) => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const loggedInProfessionalState = useContext(LoggedInProfessionalContext);
  let setLoggedInProfessional: Dispatch<
    SetStateAction<loggedInProfessional | null>
  >;
  const proChatsState = useContext(ProChats);
  let setProChats: Dispatch<SetStateAction<string[] | null>>;

  const loggedInUserState = useContext(LoggedInUserContext);

  if (loggedInProfessionalState !== null) {
    setLoggedInProfessional = loggedInProfessionalState.setLoggedInProfessional;
  }

  if (proChatsState) {
    setProChats = proChatsState.setProChats;
  }

  const submitHandler = () => {
    return getPro(regNumber)
      .then(async (res) => {
        await firebaseSignIn(res.email, password);
        setLoggedInProfessional(res);
        loggedInUserState?.setLoggedInUser(null);
        return res;
      })
      .then(async (res) => {
        setError(false);
        console.log(`${regNumber}Session`);
        const sessionID = await AsyncStorage.getItem(`${regNumber}Session`);
        if (sessionID) {
          console.log("SessionID found");
          console.log(sessionID, "<< IN PRO LOGIN");
          socket.auth = { sessionID, regNumber: res.registrationNumber };
          socket.connect();
        } else {
          console.log("No sessionID");
          socket.auth = {
            fullName: res.fullName,
            regNumber: res.registrationNumber,
          };
          socket.connect();
        }
        socket.on(
          "session",
          ({ sessionID, connectionID, talkingTo, isProfessional }) => {
            socket.auth = { sessionID };
            console.log(sessionID, "<< IN INDEX");

            if (talkingTo !== null) {
              setProChats(talkingTo);
            }
            AsyncStorage.setItem(`${regNumber}Session`, `${sessionID}`);
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
      <Text style={styles.text}>Log in as a professional</Text>
      <ScrollView contentContainerStyle={styles.inputContainer}>
        <FormInput
          value={regNumber}
          label="👤 Registration number"
          placeholder="Registration Number"
          onChange={setRegNumber}
        />
        <FormInput
          value={password}
          label="🔒 Password"
          placeholder="Password"
          secure
          onChange={setPassword}
        />
        {error ? (
          <Text style={styles.message}>
            Registration number or password incorrect
          </Text>
        ) : null}
      </ScrollView>
      <LoginPressable text="Log in" onPress={submitHandler} isPrimary />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "space-evenly",
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

export default SignInPro;
