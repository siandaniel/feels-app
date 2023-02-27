import { Text, View, StyleSheet } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";


export default function Chart() {

    const todaysDate: Date = new Date()
    const options: Object = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }
    const formattedDate: String = todaysDate.toLocaleDateString('en-UK', options);

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <View style={styles.chart}>
                <Text>Chart will go here</Text>
            </View>
        </View>
    );
  }

  const styles = StyleSheet.create({
    chartContainer: {
        height: 450,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 35,
        paddingBottom: 0,
        justifyContent: "center",
    },
    date: {
        color: white,
        margin: 10,
        marginBottom: 13,
        marginLeft: 13,
        fontSize: 25,
        fontWeight: "bold",
    },
    chart: {
        backgroundColor: lightBlue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: "95%",
        height: "80%",
        marginLeft: "auto",
        marginRight: "auto",
    }
})