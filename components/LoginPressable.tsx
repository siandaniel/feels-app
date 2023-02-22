import { useFonts } from "expo-font";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

interface Props {
  text: string;
  onPress: () => void;
  isPrimary: boolean;
}

const LoginPressable = ({ text, onPress, isPrimary }: Props) => {
  const [pressed, setPressed] = useState(false);

  const setStyles = () => {
    if (isPrimary) {
      return pressed ? styles.containerPrimaryPressed : styles.containerPrimary;
    } else {
      return pressed ? styles.containerPressed : styles.container;
    }
  };

  return (
    <Pressable
      style={setStyles}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => onPress()}
    >
      <Text style={isPrimary ? styles.textPrimary : styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightBlue,
    padding: 20,
    borderRadius: 32,
    alignSelf: "stretch",
    marginTop: 10,
  },
  containerPressed: {
    backgroundColor: blue,
    padding: 20,
    borderRadius: 32,
    alignSelf: "stretch",
    marginTop: 10,
  },
  containerPrimary: {
    backgroundColor: orange,
    padding: 20,
    borderRadius: 32,
    alignSelf: "stretch",
    marginTop: 10,
  },
  containerPrimaryPressed: {
    backgroundColor: blue,
    padding: 20,
    borderRadius: 32,
    alignSelf: "stretch",
    marginTop: 10,
  },
  text: {
    textAlign: "center",
    color: black,
    fontFamily: "Poppins-Regular",
  },
  textPrimary: {
    textAlign: "center",
    color: white,
    fontFamily: "Poppins-Regular",
  },
});

export default LoginPressable;
