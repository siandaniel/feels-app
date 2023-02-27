import { ScrollView, StyleSheet, Text, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import { useState } from "react";
import { UserCredential } from "firebase/auth";
import { getPro } from "../utils";
import { white } from "../assets/colours";

interface Props {
  hidden: boolean;
  firebaseSignIn: (email: string, password: string) => Promise<UserCredential>;
}

const SignInPro = ({ hidden, firebaseSignIn }: Props) => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const submitHandler = () => {
    return getPro(regNumber)
      .then((res) => {
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
      <Text style={styles.text}>Sign in as a professional</Text>
      <ScrollView contentContainerStyle={styles.inputContainer}>
        <FormInput
          value={regNumber}
          label="Registration number"
          placeholder="regnumber..."
          onChange={setRegNumber}
        />
        <FormInput
          value={password}
          label="Password"
          placeholder="password"
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
