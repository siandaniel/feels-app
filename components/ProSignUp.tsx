import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import type { UserCredential } from "firebase/auth";
import {
  postPro,
  validateEmail,
  validatePassword,
  validateRegNumber,
} from "../utils/utils";
import { LoggedInProfessionalContext } from "../contexts/LoggedInProfessional";
import { loggedInProfessional } from "../types";
import { LoggedInUserContext } from "../contexts/LoggedInUser";
import { socket } from "../utils/socket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ProChats } from "../contexts/ProChats";
const { white } = require("../assets/colours");

const tempImg =
  "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";

interface Props {
  hidden: boolean;
  firebaseSignUp: (a: string, b: string) => Promise<UserCredential>;
  avoidKeyboard: Dispatch<SetStateAction<boolean>>;
}

const ProSignUp = ({ hidden, firebaseSignUp, avoidKeyboard }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [regTaken, setRegTaken] = useState(false);
  const [invalidReg, setInvalidReg] = useState("");
  const loggedInUserState = useContext(LoggedInUserContext);
  const loggedInProfessionalState = useContext(LoggedInProfessionalContext);
  let setLoggedInProfessional: Dispatch<
    SetStateAction<loggedInProfessional | null>
  >;
  const proChatsState = useContext(ProChats);
  let setProChats: Dispatch<SetStateAction<string[] | null>>;

  if (loggedInProfessionalState !== null) {
    setLoggedInProfessional = loggedInProfessionalState.setLoggedInProfessional;
  }

  if (proChatsState) {
    setProChats = proChatsState.setProChats;
  }

  const submitHandler = () => {
    setRegTaken(false);
    if (
      email !== "" &&
      password !== "" &&
      fullName !== "" &&
      /^CP\d{6}$/g.test(registrationNumber) &&
      validateEmail(email)
    ) {
      postPro({
        fullName,
        email,
        registrationNumber,
        availableHours: [],
        avatarURL: tempImg,
      })
        .then(async (res) => {
          await firebaseSignUp(email, password);
          setLoggedInProfessional(res),
            loggedInUserState?.setLoggedInUser(null);
          return res;
        })
        .then(async (res) => {
          console.log(`${registrationNumber}Session`);
          const sessionID = await AsyncStorage.getItem(
            `${registrationNumber}Session`
          );
          if (sessionID) {
            console.log("SessionID found");
            console.log(sessionID, "<< IN PRO LOGIN");
            socket.auth = { sessionID };
            socket.connect();
          } else {
            console.log("No sessionID");
            socket.auth = { fullName: fullName };
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
              AsyncStorage.setItem(
                `${registrationNumber}Session`,
                `${sessionID}`
              );
              socket.connectionID = connectionID;
              socket.isProfessional = isProfessional;
            }
          );

          socket.auth = { fullName: res.fullName };
          socket.connect();
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data);
          if (error.response.data.message === "Key must be unique") {
            setRegTaken(true);
            setInvalidReg(registrationNumber);
          }
        });
    }
  };

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <Text style={styles.heading}>Sign up as a professional</Text>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <FormInput
          value={fullName}
          onChange={setFullName}
          placeholder="Full Name..."
          label="Full Name"
          message="Please enter your name"
          isValid={fullName.length > 0}
          avoidKeyboard={avoidKeyboard}
        />
        <FormInput
          value={email}
          onChange={setEmail}
          placeholder="Email..."
          label="Email"
          message="Please enter a valid email"
          isValid={validateEmail(email)}
          avoidKeyboard={avoidKeyboard}
        />
        <FormInput
          value={registrationNumber}
          onChange={setRegistrationNumber}
          placeholder="Registration Number"
          label="Registration Number"
          message="Please enter a valid registration number i.e. 'CP123456'"
          isValid={validateRegNumber(registrationNumber)}
          avoidKeyboard={avoidKeyboard}
          isAvoiding
        />
        {regTaken && (
          <Text
            style={styles.userError}
          >{`The registration ${invalidReg} is already taken`}</Text>
        )}
        <FormInput
          value={password}
          onChange={setPassword}
          placeholder="Password"
          label="Password"
          secure
          message="Password must be at least 6 characters"
          isValid={validatePassword(password)}
          avoidKeyboard={avoidKeyboard}
          isAvoiding
        />
      </ScrollView>
      <LoginPressable text="Sign up" onPress={submitHandler} isPrimary={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  innerContainer: {
    paddingBottom: 24,
  },
  hidden: {
    display: "none",
  },
  text: {
    marginBottom: 8,
    marginTop: 24,
    fontFamily: "Poppins-Regular",
    color: white,
    fontSize: 16,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: white,
    textAlign: "center",
    paddingBottom: 24,
  },
  daysContainer: {
    marginLeft: 16,
  },
  userError: {
    color: "#FFC4B5",
    marginLeft: 16,
    marginTop: 10,
    fontStyle: "italic",
  },
});
// full name
// email
// reg number
// avail hours
// password

export default ProSignUp;
