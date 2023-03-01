import { Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { black, orange, white } from "../assets/colours";

interface Props {
  label: string;
  placeholder: string;
  isNumber?: boolean;
  secure?: boolean;
  onChange: Dispatch<SetStateAction<string>>;
  horizontal?: boolean;
  last?: boolean;
  message?: string;
  isValid?: boolean;
  value: string;
  avoidKeyboard?: Dispatch<SetStateAction<boolean>>;
  isAvoiding?: boolean;
}

const FormInput = ({
  label,
  placeholder,
  isNumber = false,
  secure = false,
  onChange,
  horizontal,
  last,
  message = "",
  isValid = true,
  value,
  avoidKeyboard,
  isAvoiding = false,
}: Props) => {
  // ADD ICONS

  const setAvoidKeyboard = (value: boolean) => {
    if (avoidKeyboard) avoidKeyboard(value);
  };

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
        value={value}
        style={styles.input}
        placeholder={placeholder}
        selectionColor={orange}
        keyboardType={isNumber ? "number-pad" : "default"}
        secureTextEntry={secure}
        onChangeText={onChange}
        onFocus={() => setAvoidKeyboard(isAvoiding)}
      />
      {!isValid ? <Text style={styles.message}>{message}</Text> : null}
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
  message: {
    marginTop: 8,
    marginLeft: 16,
    color: white,
  },
});

export default FormInput;
