import { Text, View, StyleSheet, ScrollView } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";

export default function SideScroll() {
    return (
        <ScrollView contentContainerStyle={styles.sideScroller} horizontal={true}>
            <Text style={styles.text}>Test 1</Text>
            <Text style={styles.text}>Test 2</Text>
            <Text style={styles.text}>Test 3</Text>
            <Text style={styles.text}>Test 4</Text>
            <Text style={styles.text}>Test 5</Text>
            <Text style={styles.text}>Test 6</Text>
            <Text style={styles.text}>Test 7</Text>
        </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    sideScroller: {
        minWidth: "100%",
        height: 350,
        padding: 10,
    },
    text: {
        fontSize: 50,
    }
})