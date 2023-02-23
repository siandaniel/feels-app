import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LoginPressable from "../components/LoginPressable";
import SignInPro from "../components/SignInPro";
import SignInUser from "../components/SignInUser";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [isUser, setIsUser] = useState(true);

  const fbLogin = async (email: string, password: string) => {
    try {
      const userData = await signInWithEmailAndPassword(auth, email, password);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SignInUser hidden={isUser} />
        <SignInPro hidden={!isUser} />
        <LoginPressable
          text="press"
          onPress={() => setIsUser((current) => !current)}
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
    alignSelf: "stretch",
    paddingVertical: 100,
    backgroundColor: blue,
    paddingHorizontal: "5%",
  },
});

export default Login;
