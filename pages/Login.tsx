import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import LoginPressable from "../components/LoginPressable";
import SignInPro from "../components/SignInPro";
import SignInUser from "../components/SignInUser";
import { blue } from "../assets/colours";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [isUser, setIsUser] = useState(true);

  const fbLogin = async (email: string, password: string) => {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    return userData;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SignInUser hidden={isUser} firebaseSignIn={fbLogin} />
        <SignInPro hidden={!isUser} firebaseSignIn={fbLogin} />
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
    justifyContent: "center",
    alignSelf: "stretch",
    backgroundColor: blue,
    paddingHorizontal: "5%",
  },
});

export default Login;
