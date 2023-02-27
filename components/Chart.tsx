import { Text, View, StyleSheet } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import WebView from "react-native-webview";
import { useEffect, useState } from "react";

interface Props {
  userMoods: Array<Object>;
}

export default function Chart({ userMoods }: Props) {
  const todaysDate: Date = new Date();
  const options: Object = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const formattedDate: String = todaysDate.toLocaleDateString("en-UK", options);

  const formattedMoods = userMoods.map((mood) => {
    return [Object.keys(mood)[0], Object.values(mood)[0]];
  });

  const ExampleChart = `<html>
      <head>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
          google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);
    
          function drawChart() {
            const data = google.visualization.arrayToDataTable([
              ['Date', 'Mood'],
              ["22/02/2023", -1],
              ["23/02/2023", 0],
              ["24/02/2023", 2],
              ["25/02/2023", 1],
              ["26/02/2023", -2],
              ["27/02/2023", 3],         
            ]);
    
            const options = {
              title: 'Your Feels',
              curveType: 'function',
              legend: { position: 'bottom' },
              lineWidth: 6,
              series: {
                0: { color: 'red' },
              }
            };
    
            const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    
            chart.draw(data, options);
          }
        </script>
      </head>
      <body>
        <div id="curve_chart" style="width: 900px; height: 500px"></div>
      </body>
    </html>`;

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.date}>{formattedDate}</Text>
      <View style={styles.chart}>
        <WebView source={{ html: ExampleChart }} style={styles.webStyle} />
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
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: "95%",
    height: "80%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  webStyle: {
    width: 300,
    flex: 1,
  },
});
