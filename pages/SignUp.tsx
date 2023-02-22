import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import LoginPressable from "../components/LoginPressable";
import ProSignUp from "../components/ProSignUp";
import UserSignUp from "../components/UserSignUp";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

interface UserDetails {
  username: string;
  email: string;
  password: string;
  date_of_birth: string;
}

interface ProfessionalDetails {
  fullName: string;
  email: string;
  registrationNumber: string;
  password: string;
}

const SignUp = () => {
  const [isUser, setIsUser] = useState(true);
  const [details, setDetails] = useState<UserDetails | null>(null);
  const [proDetails, setProDetails] = useState<ProfessionalDetails | null>(
    null
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <UserSignUp setDetails={setDetails} hidden={isUser} />
        <ProSignUp setDetails={setProDetails} hidden={!isUser} />
        <LoginPressable
          text={`Sign up as ${isUser ? "a user" : "a professional"}`}
          onPress={() => {
            setIsUser((curr) => !curr);
            setDetails(null);
            setProDetails(null);
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
    alignSelf: "stretch",
    padding: 25,
    paddingVertical: 100,
    backgroundColor: blue,
  },
});

export default SignUp;
