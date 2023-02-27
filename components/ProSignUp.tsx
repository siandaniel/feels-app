import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import type { UserCredential } from "firebase/auth";
import {
  postPro,
  validateEmail,
  validatePassword,
  validateRegNumber,
} from "../utils";
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

  const submitHandler = () => {
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
        .then(() => {
          return firebaseSignUp(email, password);
        })
        .then((res) => {
          console.log(res.user.email);
        })
        .catch((error) => {
          if (error.response) console.log(error.response.data);
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
});
// full name
// email
// reg number
// avail hours
// password

export default ProSignUp;
