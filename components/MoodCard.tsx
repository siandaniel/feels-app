import { View, Text } from "react-native";
import { orange } from "../assets/colours";

interface Props {
    mood: String
}

export default function MoodCard({mood}: Props) {
    return (
        <View style={styles.cardContainer as any}>
            <View style={styles.placeholder}></View>
            <Text style={styles.moodText}>{mood}</Text>
        </View>
    );
  }

  const styles = {
    cardContainer: {
        alignItems: 'center',
        justifyContent: "center",
        height: 190,
        marginHorizontal: 10 
    },
    moodText: {
        marginTop: 10,
        fontSize: 19
    },
    placeholder: {
        backgroundColor: orange,
        borderRadius: 60,
        height: 110,
        width: 110
    },
  }