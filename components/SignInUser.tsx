import { View, StyleSheet, ScrollView } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import { useState } from "react";
import { UserCredential } from "firebase/auth";
import { getUser } from "../utils";

interface Props {
  hidden: boolean;
  firebaseSignIn: (a: string, b: string) => Promise<UserCredential>;
}

const SignInUser = ({ hidden, firebaseSignIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    return getUser(username)
      .then((res) => {
        return firebaseSignIn(res.email, password);
      })
      .then((data) => {
        console.log(data.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <ScrollView contentContainerStyle={styles.inputContainer}>
        <FormInput
          value={username}
          label="Username"
          placeholder="username..."
          onChange={setUsername}
        />
        <FormInput
          value={password}
          label="Password"
          placeholder="password"
          secure
          onChange={setPassword}
        />
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
  hidden: { display: "none" },
});

export default SignInUser;
