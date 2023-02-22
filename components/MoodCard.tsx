import { View, Text } from "react-native";

interface Props {
    mood: String
}

export default function MoodCard({mood}: Props) {
    return (
        <View style={styles.cardContainer}>
            <View></View>
            <Text>{mood}</Text>
        </View>
    );
  }

  const styles = {
    cardContainer: {
        height: 50,
        borderColor: "purple",
        borderWidth: 2,
    }
  }