import { View, Text, Button, StyleSheet } from "react-native";

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
