import { View, Text, Button, StyleSheet } from "react-native";
import GetHelpPlaceholder from "../components/getHelpPlaceholder";

export default function GetHelpPage() {
  return (
    <View style={styles.page}>
      <Text> Hello from Get Help page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 60,
  },
});
