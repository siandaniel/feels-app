import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View,  } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
const { lightBlue, blue, orange, black, white } = require("../assets/colours");
import CheckBox from "@react-native-community/checkbox";

interface ProfessionalDetails {
  fullName: string;
  email: string;
  registrationNumber: string;
  password: string;
}

interface Props {
  hidden: boolean;
  setDetails: Dispatch<SetStateAction<ProfessionalDetails | null>>;
}

const ProSignUp = ({ hidden, setDetails }: Props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [password, setPassword] = useState("");
  return (
    <View style={hidden ? styles.hidden : styles.container}>
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
      <View>
        <Text style={styles.text}>Available Hours</Text>
      <CheckBox/>
      <CheckBox/>
      <CheckBox/>
      <CheckBox/>
      <CheckBox/>
      </View>

      <LoginPressable
        text="Sign up"
        onPress={() => {
          setDetails({ fullName, email, registrationNumber, password });
        }}
        isPrimary={true}
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
  hidden: {
    display: "none",
  },
  hoursContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  smallContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
  },
  text: {
    fontFamily: "Poppins-Regular",
    color: white,
    fontSize: 16,
  },
});
// full name
// email
// reg number
// avail hours
// password

export default ProSignUp;
