import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import type { UserCredential } from "firebase/auth";
import { white } from "../assets/colours";
import {
  postUser,
  validateDate,
  validateEmail,
  validatePassword,
} from "../utils/utils";
import DateOfBirthForm from "./DateOfBirthForm";
// CHANGE THIS
const tempImg =
  "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";

interface Props {
  hidden: boolean;
  firebaseSignUp: (a: string, b: string) => Promise<UserCredential>;
  avoidKeyboard: Dispatch<SetStateAction<boolean>>;
}

const UserSignUp = ({ hidden, firebaseSignUp, avoidKeyboard }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const submitHandler = () => {
    if (
      email !== "" &&
      password !== "" &&
      username !== "" &&
      validateDate(+day, +month, +year) &&
      validateEmail(email)
    ) {
      postUser({
        username,
        email,
        date_of_birth: `${day}/${month}/${year}`,
        avatar_url: tempImg,
      })
        .then(() => {
          return firebaseSignUp(email, password);
        })
        .then((res) => {
          console.log(res.user.email);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response.data);
          }
        });
    } else console.log("u did it wrong", validateDate(+day, +month, +year));
  };

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <Text style={styles.heading}>Sign up as a user</Text>
      <ScrollView contentContainerStyle={styles.innerContainer}>
        <FormInput
          value={username}
          onChange={setUsername}
          placeholder="Username..."
          label="Username"
          message="Please enter a username"
          isValid={username.length > 0}
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
        <DateOfBirthForm
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
          day={day}
          month={month}
          year={year}
          avoidKeyboard={avoidKeyboard}
          message="Please enter a valid date of birth"
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
          isAvoiding={true}
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
  DOBcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 24,
    marginLeft: 16,
    marginBottom: -15,
    color: white,
  },
  heading: {
    fontSize: 20,
    fontFamily: "Poppins-Medium",
    color: white,
    textAlign: "center",
    paddingBottom: 24,
  },
  hidden: {
    display: "none",
  },
});
// username
// email
// date of birth
// password
// avatar URL
export default UserSignUp;
