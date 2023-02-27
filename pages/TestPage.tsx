import { View, Text, Button, StyleSheet } from "react-native";

export default function ProfilePage() {
  return (
    <View style={styles.page}>
      <Text> Hello from Profile page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    marginTop: 60,
  },
});
