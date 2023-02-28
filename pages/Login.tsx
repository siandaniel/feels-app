import { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from "react-native";
import SignInPro from "../components/SignInPro";
import SignInUser from "../components/SignInUser";
import { blue, white } from "../assets/colours";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./LoginStack";

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamsList>;
}

const Login = () => {
  const [isProfessional, setIsProfessional] = useState(false);

  const fbLogin = async (email: string, password: string) => {
    const userData = await signInWithEmailAndPassword(auth, email, password);
    return userData;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <SignInUser hidden={isProfessional} firebaseSignIn={fbLogin} />
        <SignInPro hidden={!isProfessional} firebaseSignIn={fbLogin} />
        <View style={{marginTop: 8}}>
          <Button
            color={white}
            title={`Want to log in as ${isProfessional ? "a user instead?" : "a professional instead?"}`}
            onPress={() => setIsProfessional((curr) => !curr)}
          />
        </View>
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
