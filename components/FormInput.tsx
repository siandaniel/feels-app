import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

interface Props {
  label: string;
  placeholder: string;
  isNumber?: boolean;
  secure?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
}

const FormInput = ({
  label,
  placeholder,
  isNumber = false,
  secure = false,
  onChange,
}: Props) => {
  // ADD ICONS
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        keyboardType={isNumber ? "number-pad" : "default"}
        secureTextEntry={secure}
        onChangeText={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: white,
    fontSize: 16,
  },
  input: {
    alignSelf: "stretch",
    backgroundColor: white,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginTop: 8,
    color: black,
  },
});

export default FormInput;
