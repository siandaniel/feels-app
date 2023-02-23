import { useState } from "react";
import { Text, View, StyleSheet, ScrollView, Button } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import Chart from "../components/Chart";
import Mood from "../components/Mood";
import Moodal from "../components/Moodal";
import Recommended from "../components/Recommended";

export default function MoodTrackingPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <View>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.chart}>
          <Chart />
        </View>
        <View style={styles.mood}>
          <Mood />
        </View>
        <View style={styles.recommended}>
          <Recommended />
        </View>
        <View style={styles.button}>
          <Button
            title="Track your mood"
            color={orange}
            onPress={() => {
              setShowModal(true);
            }}
          ></Button>
          {/* <Button
            onPress={() => navigation.navigate("TestPage")}
            title="Go to screen 2"
          /> */}
        </View>
        {showModal && (
          <Moodal showModal={showModal} setShowModal={setShowModal} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: blue,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  chart: {
    width: "100%",
  },
  mood: {
    width: "100%",
  },
  recommended: {
    width: "100%",
  },
  button: {
    marginTop: -20,
    marginBottom: 50,
  },
});
