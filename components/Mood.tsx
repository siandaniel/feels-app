import { View, Text, StyleSheet } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { todaysDate } from "../utils/todaysDate";

interface Props {
  todaysMood: String;
}

export default function Mood({ todaysMood }: Props) {
  return (
    <View style={styles.moodContainer}>
      <Text style={styles.header}>Today's Feels</Text>
      <View style={styles.text}>
        <Text>{`Today you're feeling ${todaysMood}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  moodContainer: {
    height: 200,
    padding: 10,
    justifyContent: "center",
  },
  header: {
    color: white,
    marginBottom: 8,
    marginLeft: 9,
    fontSize: 20,
  },
  text: {
    backgroundColor: lightBlue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: "95%",
    height: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
