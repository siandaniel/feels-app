import { useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LoginPressable from "../components/LoginPressable";
import ProSignUp from "../components/ProSignUp";
import UserSignUp from "../components/UserSignUp";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { blue, white } from "../assets/colours";

const SignUp = () => {
  const [isProfessional, setIsProfessional] = useState(false);
  const [isAvoiding, setIsAvoiding] = useState(false);
  const fbSignUp = async (email: string, password: string) => {
    const userData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userData;
  };

  return (
    <KeyboardAvoidingView
      behavior={"padding"}
      style={styles.outer}
      enabled={isAvoiding}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <UserSignUp
            avoidKeyboard={setIsAvoiding}
            hidden={isProfessional}
            firebaseSignUp={fbSignUp}
          />
          <ProSignUp
            avoidKeyboard={setIsAvoiding}
            hidden={!isProfessional}
            firebaseSignUp={fbSignUp}
          />
          <Button
            color={white}
            title={`Want to sign up as ${isProfessional ? "a user instead?" : "a professional instead?"}`}
            onPress={() => setIsProfessional((curr) => !curr)}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: blue,
    paddingHorizontal: "5%",
  },
});

export default SignUp;
