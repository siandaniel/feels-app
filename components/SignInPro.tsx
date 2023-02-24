import { ScrollView, StyleSheet, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import { useState } from "react";
import { UserCredential } from "firebase/auth";
import { getPro } from "../utils";

interface Props {
  hidden: boolean;
  firebaseSignIn: (email: string, password: string) => Promise<UserCredential>;
}

const SignInPro = ({ hidden, firebaseSignIn }: Props) => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = () => {
    return getPro(regNumber)
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
  hidden: { display: "none" },
});

export default SignInPro;
