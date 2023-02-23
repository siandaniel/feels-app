import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import FormCheckBox from "./FormCheckBox";
import type { UserCredential } from "firebase/auth";
import { postPro } from "../utils";
import { Weekdays } from "../types";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

interface Props {
  hidden: boolean;
  firebaseSignUp: (a: string, b: string) => Promise<UserCredential>;
}

const ProSignUp = ({ hidden, firebaseSignUp }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  const [days, setDays] = useState<Weekdays>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
  });

  const submitHandler = () => {
    if (email !== "" && password !== "") {
      firebaseSignUp(email, password).then((res) => {
        // return postPro(tempPro);
      });
    }
  };

  const handleCheckBoxes = (day: keyof Weekdays) => {
    setDays((curr) => {
      curr[day] = !curr[day];
      return curr;
    });
  };

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <ScrollView>
        <FormInput
          onChange={setFullName}
          placeholder="Full Name..."
          label="Full Name"
        />
        <FormInput onChange={setEmail} placeholder="Email..." label="Email" />
        <FormInput
          onChange={setRegistrationNumber}
          placeholder="Registration Number"
          label="Registration Number"
        />
        <FormInput
          onChange={setPassword}
          placeholder="Password"
          label="Password"
          secure
        />
        {/* <View style={styles.daysContainer}>
          <Text style={styles.text}>Available Days</Text>
          <FormCheckBox onChange={handleCheckBoxes} day="monday" />
          <FormCheckBox onChange={handleCheckBoxes} day="tuesday" />
          <FormCheckBox onChange={handleCheckBoxes} day="wednesday" />
          <FormCheckBox onChange={handleCheckBoxes} day="thursday" />
          <FormCheckBox onChange={handleCheckBoxes} day="friday" />
        </View> */}
      </ScrollView>
      <LoginPressable text="Sign up" onPress={submitHandler} isPrimary={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
  hidden: {
    display: "none",
  },
  text: {
    marginBottom: 8,
    marginTop: 24,
    fontFamily: "Poppins-Regular",
    color: white,
    fontSize: 16,
  },
  daysContainer: {
    marginLeft: 16,
  },
});
// full name
// email
// reg number
// avail hours
// password

export default ProSignUp;
