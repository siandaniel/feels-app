import { StyleSheet, View, Text } from "react-native";
import { black, lightBlue, white } from "../assets/colours";

export default function RecommendedCard() {
    return (
        <View style={styles.recContainer}>
            <View style={styles.textBkgnd}>
                <Text style={styles.title}>Recommended</Text>
            </View>
        </View>
    );
  }

  const styles = StyleSheet.create({
    recContainer: {
        borderRadius: 25,
        marginHorizontal: 8,
        height: 230,
        width: 160,
        backgroundColor: lightBlue,
        justifyContent: "flex-end",
    },
    title: {
        fontSize: 18,
        marginTop: 2,
        marginBottom: 5
    },
    textBkgnd: {
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        padding: 8,
        minHeight: 50,
        width: "100%",
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
    }
  })
