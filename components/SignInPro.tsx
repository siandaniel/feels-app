import { ScrollView, StyleSheet, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import { useState } from "react";

interface Props {
  hidden: boolean;
}

const SignInPro = ({ hidden }: Props) => {
  const [regNumber, setRegNumber] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <ScrollView>
        <FormInput
          label="Registration number"
          placeholder="regnumber..."
          onChange={setRegNumber}
        />
        <FormInput
          label="Password"
          placeholder="password"
          secure
          onChange={setPassword}
        />
      </ScrollView>
      <LoginPressable
        text="Log in"
        onPress={() => console.log(regNumber, password)}
        isPrimary
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
  hidden: { display: "none" },
});

export default SignInPro;
