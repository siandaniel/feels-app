import { View, Text, StyleSheet } from "react-native";
import { blue } from "../assets/colours";

export default function ProfilePage() {
  return (
    <View style={styles.page}>
      <Text> Hello from Profile page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: blue,
    marginTop: 60,
  },
});
