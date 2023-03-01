import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";

export default function GetHelpPlaceholder() {
  return (
    <View style={styles.page}>
      <View style={styles.textContainer}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/914/914622.png",
          }}
          style={styles.image}
        />
        <Text style={styles.text}>
          You are now in the waiting room and a professional will be with you
          soon.{" "}
        </Text>
        <Text style={styles.whynot}>
          Why not have a look at your recommended 'For You' activities while you wait?
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    color: white,
    marginBottom: 8,
    marginLeft: 9,
    fontSize: 20,
  },
  image: {
    resizeMode: "cover",
    height: 230,
    width: 230,
    marginBottom: 30,
  },
  page: {
    height: "100%",
    backgroundColor: blue,
    paddingLeft: 30,
    paddingRight: 30,
  },
  textContainer: {
    backgroundColor: lightBlue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: "95%",
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 85,
    marginBottom: "auto",
  },
  text: {
    fontSize: 20,
    padding: 20,
    textAlign: "center",
  },
  whynot: {
    fontSize: 20,
    padding: 20,
    paddingLeft: 30,
    paddingRight: 30,
    textAlign: "center",
    color: blue,
    fontWeight: "bold",
  },
});
