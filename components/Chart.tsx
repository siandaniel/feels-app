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

                hAxis: {
                    title: 'Date',
                    textStyle: {
                        color: '#01579b',
                        fontSize: 22,
                        fontName: 'Arial',
                        bold: true,
                        italic: true
                      },
                      titleTextStyle: {
                        color: '#01579b',
                        fontSize: 40,
                        fontName: 'Arial',
                        bold: false,
                        italic: true
                      },
                  },
                  vAxis: {
                    title: 'Mood',
                    textStyle: {
                        color: '#01579b',
                        fontSize: 30,
                        fontName: 'Arial',
                        bold: true,
                        italic: true,
                      },
                      titleTextStyle: {
                        color: '#01579b',
                        fontSize: 40,
                        fontName: 'Arial',
                        bold: false,
                        italic: true
                      },
                  },
                backgroundColor: "#c5fffd",
                width: 1150,
                height: 1070,
              title: 'Your Feels',
              fontSize: 40,
              curveType: 'function',
              legend: 'none',
              chartArea:{left:150,top:150,width:"70%",height:"70%"},
              lineWidth: 6,
              series: {
                0: { color: "#fe654f" },
              }
            };
    
            const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    
            chart.draw(data, options);
          }
        </script>
      </head>
      <body>
        <div id="curve_chart" style="width: 900px; height: 500px; margin: -12px; padding-left: 6px"></div>
      </body>
    </html>`;

  return (
    <View style={styles.chartContainer}>
      <Text style={styles.date}>{formattedDate}</Text>
      <WebView source={{ html: ExampleChart }} style={styles.chart} />
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
    paddingLeft: 30,
  },
  webStyle: {
    backgroundColor: lightBlue,
    width: "100%",
    height: "100%",
  },
});
