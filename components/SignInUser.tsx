import { View, StyleSheet, ScrollView, Text } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import { useState } from "react";
import { UserCredential } from "firebase/auth";
import { getUser } from "../utils";
import { white } from "../assets/colours";

interface Props {
  hidden: boolean;
  firebaseSignIn: (a: string, b: string) => Promise<UserCredential>;
}

const SignInUser = ({ hidden, firebaseSignIn }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submitHandler = () => {
    return getUser(username)
      .then((res) => {
        console.log(res.email);

        return firebaseSignIn(res.email, password);
      })
      .then((data) => {
        setError(false);
        console.log(data.user.email);
      })
      .catch(() => {
        setError(true);
      });
  };

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <Text style={styles.text}>Sign in as a user</Text>
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
