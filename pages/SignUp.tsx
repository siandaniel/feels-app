import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LoginPressable from "../components/LoginPressable";
import ProSignUp from "../components/ProSignUp";
import UserSignUp from "../components/UserSignUp";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { blue } from "../assets/colours";

const SignUp = () => {
  const [isUser, setIsUser] = useState(true);

  const fbSignUp = async (email: string, password: string) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userData;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <UserSignUp hidden={isUser} firebaseSignUp={fbSignUp} />
        <ProSignUp hidden={!isUser} firebaseSignUp={fbSignUp} />
        <LoginPressable
          text={`Sign up as ${isUser ? "a user" : "a professional"}`}
          onPress={() => {
            setIsUser((curr) => !curr);
          }}
          isPrimary={false}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 100,
    backgroundColor: blue,
    borderWidth: 2,
    paddingHorizontal: "5%",
  },
});

export default SignUp;
