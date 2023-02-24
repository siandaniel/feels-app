import { Dispatch, SetStateAction, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import FormInput from "./FormInput";
import LoginPressable from "./LoginPressable";
import type { UserCredential } from "firebase/auth";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { postUser } from "../utils";
// CHANGE THIS
const tempImg =
  "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png";

interface Props {
  hidden: boolean;
  firebaseSignUp: (a: string, b: string) => Promise<UserCredential>;
}

const UserSignUp = ({ hidden, firebaseSignUp }: Props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const submitHandler = () => {
    if (email !== "" && password !== "") {
      firebaseSignUp(email, password)
        .then(() => {
          return postUser({
            username,
            email,
            date_of_birth: `${day}/${month}/${year}}`,
            avatar_url: tempImg,
          });
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <View style={hidden ? styles.hidden : styles.container}>
      <ScrollView>
        <FormInput
          onChange={setUsername}
          placeholder="Username..."
          label="Username"
        />
        <FormInput onChange={setEmail} placeholder="Email..." label="Email" />
        <View>
          <Text style={styles.text}>Date of Birth</Text>
          <View style={styles.DOBcontainer}>
            <FormInput
              onChange={setDay}
              placeholder="  DD  "
              label=""
              isNumber
              horizontal
            />
            <FormInput
              onChange={setMonth}
              placeholder="  MM  "
              label=""
              isNumber
              horizontal
            />
            <FormInput
              onChange={setYear}
              placeholder="YYYY"
              label=""
              isNumber
              horizontal
              last
            />
          </View>
          <FormInput
            onChange={setPassword}
            placeholder="Password"
            label="Password"
            secure
          />
        </View>
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
  DOBcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    marginTop: 24,
    marginLeft: 16,
    marginBottom: -15,
    color: white,
  },
  hidden: {
    display: "none",
  },
});
// username
// email
// date of birth
// password
// avatar URL
export default UserSignUp;
