import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

interface Props {
  label: string;
  placeholder: string;
  isNumber?: boolean;
  secure?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  horizontal?: boolean;
  last?: boolean;
}

const FormInput = ({
  label,
  placeholder,
  isNumber = false,
  secure = false,
  onChange,
  horizontal,
  last,
}: Props) => {
  // ADD ICONS

  const getStyles = () => {
    if (horizontal) {
      if (last) return styles.containerHorizLast;
      return styles.containerHoriz;
    } else return styles.container;
  };

  return (
    <View style={getStyles()}>
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
    flex: 1,
    marginTop: 20,
  },
  containerHoriz: {
    flex: 1,
    marginRight: 24,
  },
  containerHorizLast: {
    flex: 1,
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: white,
    fontSize: 16,
    marginLeft: 16,
  },
  input: {
    alignSelf: "stretch",
    backgroundColor: white,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 8,
    color: black,
  },
});

export default FormInput;
