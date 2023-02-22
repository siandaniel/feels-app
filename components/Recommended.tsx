import { View, Text, StyleSheet, ScrollView } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";

export default function Recommended() {
  return (
    <View style={styles.recommendedContainer}>
      <Text style={styles.header}>For You</Text>
      <View style={styles.scroller}>
        <ScrollView
          contentContainerStyle={styles.sideScroller}
          horizontal={true}
        >
          <Text style={styles.text}>Test 1</Text>
          <Text style={styles.text}>Test 2</Text>
          <Text style={styles.text}>Test 3</Text>
          <Text style={styles.text}>Test 4</Text>
          <Text style={styles.text}>Test 5</Text>
          <Text style={styles.text}>Test 6</Text>
          <Text style={styles.text}>Test 7</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recommendedContainer: {
    height: 450,
    padding: 10,
  },
  header: {
    color: white,
    marginLeft: 5,
    marginBottom: 8,
    fontSize: 20,
  },
  scroller: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sideScroller: {
    minWidth: "100%",
    height: 350,
    padding: 30,
    borderColor: "black",
    borderWidth: 2,
  },
  text: {
    fontSize: 50,
  },
});
