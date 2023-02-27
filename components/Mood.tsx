import { View, Text, StyleSheet, Pressable } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { todaysDate } from "../utils/todaysDate";
import { Dispatch, SetStateAction } from "react";

interface Props {
  todaysMood: String;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export default function Mood({ todaysMood, setShowModal }: Props) {
  return (
    <View style={styles.moodContainer}>
      <Text style={styles.header}>Today's Feels</Text>
      <View style={styles.textContainer}>
        {todaysMood === "" && 
        <>
          <Text style={styles.text}>Don't forget to track your Feels</Text>
          <Pressable
            style={styles.submitButton}
            onPress={() => {
              if (todaysMood === "") {
                setShowModal(true);
              } else {
                setShowModal(false);
              }
            }}
          >
            <Text style={styles.submitButtonText}>Track</Text>
          </Pressable>
        </>}
        {todaysMood !== "" && <Text style={styles.text}>{`Today you're feeling ${todaysMood}`}</Text>}
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
  textContainer: {
    backgroundColor: lightBlue,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: "95%",
    height: "70%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontSize: 19
  },
  submitButton: {
    backgroundColor: orange,
    padding: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginTop: 10
  },
  submitButtonText: {
    fontSize: 17,
    color: white,
  },
});
