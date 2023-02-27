import { Image, StyleSheet, Text, View } from "react-native";
import LoginPressable from "../components/LoginPressable";
const landingImg = require("../assets/test-img2.jpg");

import { blue, white } from "../assets/colours";

const Landing = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={landingImg} style={styles.image} />
      </View>
      <Text style={styles.text}>Feels</Text>
      <View style={styles.buttonsContainer}>
        <LoginPressable text={"Log in"} onPress={() => {}} isPrimary={false} />
        <LoginPressable text={"Sign up"} onPress={() => {}} isPrimary={true} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    alignSelf: "stretch",
    padding: 25,
    backgroundColor: blue,
  },
  buttonsContainer: {
    alignSelf: "stretch",
  },
  text: {
    fontSize: 64,
    fontFamily: "Lobster",
    color: white,
  },
  image: {
    resizeMode: "cover",
    height: 300, // CHANGE LATER
    width: 300,
    borderRadius: 150,
  },
});

export default Landing;
