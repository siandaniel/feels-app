import { StyleSheet, Text, View } from "react-native";

function WaitingRoom() {
    return (
        <View style={styles.page}>
            <Text>Welcome to the waiting room</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
      marginTop: 60,
    },
  });
  

export default WaitingRoom;