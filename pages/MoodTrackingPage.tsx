import { Text, View, StyleSheet, ScrollView } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import Chart from "../components/Chart";
import Mood from "../components/Mood";
import Recommended from "../components/Recommended";

export default function MoodTrackingPage() {
    return (
        <ScrollView contentContainerStyle={styles.page}>
            <View style={styles.chart}><Chart/></View>
            <View style={styles.mood}><Mood/></View>
            <View style={styles.recommended}><Recommended/></View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: blue,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: "100%",
    },
    chart: {
        width: "100%",
    },
    mood: {
        width: "100%",
    },
    recommended: {
        width: "100%",
    },
})