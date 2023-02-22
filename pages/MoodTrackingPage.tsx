import { Text, View, StyleSheet } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import Chart from "../components/Chart";

export default function MoodTrackingPage() {
    return (
        <View style={styles.page}>
            <Chart/>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: blue,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})