import { View, Text, Button, StyleSheet } from "react-native";
import GetHelpPlaceholder from "../components/getHelpPlaceholder";
import Chat from "../components/Chat";

export default function GetHelpPage() {
  return (
    <View style={styles.page}>
      <Chat />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
  },
});
