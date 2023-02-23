import CheckBox from "expo-checkbox";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

interface Weekdays {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
}

interface Props {
  day: keyof Weekdays;
  onChange: (i: keyof Weekdays) => void;
}

const FormCheckBox = ({ onChange, day }: Props) => {
  const [selected, setSelected] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{day}</Text>
      <CheckBox
        value={selected}
        onValueChange={() => {
          setSelected((prev) => !prev);
          onChange(day);
        }}
        color={selected ? orange : white}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  checkBox: {},
  text: {
    fontFamily: "Poppins-Regular",
    textTransform: "capitalize",
    color: white,
    fontSize: 16,
  },
});

export default FormCheckBox;
