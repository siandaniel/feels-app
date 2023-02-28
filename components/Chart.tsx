import { Text, View, StyleSheet } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import WebView from "react-native-webview";
import { useEffect } from "react";

interface Props {
  userMoods: Array<Object>;
  todaysMood: string;
}

export default function Chart({ userMoods, todaysMood }: Props) {
  const todaysDate: Date = new Date();
  const options: Object = {
    weekday: "long",
    day: "numeric",
    month: "long",
  };
  const formattedDate: String = todaysDate.toLocaleDateString("en-UK", options);

  if (userMoods.length === 0) {
    return (
      <View style={styles.chartContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
        <View style={styles.chart}>
          <Text style={styles.text}>Track your Feels to see your data!</Text>
        </View>
      </View>
    );
  } else {
    const formattedMoods = userMoods.map((mood) => {
      return [Object.keys(mood)[0], Object.values(mood)[0]];
    });

    let MoodChart = `<html>
      <head>
        <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript">
          google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);
    
          function drawChart() {
            const data = google.visualization.arrayToDataTable([
              ['Date', 'Mood'],`;

    if (formattedMoods[formattedMoods.length - 7]) {
      MoodChart += `['${formattedMoods[formattedMoods.length - 7][0]}', ${
        formattedMoods[formattedMoods.length - 7][1]
      }],`;
    }
    if (formattedMoods[formattedMoods.length - 6]) {
      MoodChart += `['${formattedMoods[formattedMoods.length - 6][0]}', ${
        formattedMoods[formattedMoods.length - 6][1]
      }],`;
    }
    if (formattedMoods[formattedMoods.length - 5]) {
      MoodChart += `['${formattedMoods[formattedMoods.length - 5][0]}', ${
        formattedMoods[formattedMoods.length - 5][1]
      }],`;
    }
    if (formattedMoods[formattedMoods.length - 4]) {
      MoodChart += `['${formattedMoods[formattedMoods.length - 4][0]}', ${
        formattedMoods[formattedMoods.length - 4][1]
      }],`;
    }
    if (formattedMoods[formattedMoods.length - 3]) {
      MoodChart += `['${formattedMoods[formattedMoods.length - 3][0]}', ${
        formattedMoods[formattedMoods.length - 3][1]
      }],`;
    }
    if (formattedMoods[formattedMoods.length - 2]) {
      MoodChart += `['${formattedMoods[formattedMoods.length - 2][0]}', ${
        formattedMoods[formattedMoods.length - 2][1]
      }],`;
    }
    if (formattedMoods[formattedMoods.length - 1]) {
      MoodChart += `['${formattedMoods[formattedMoods.length - 1][0]}', ${
        formattedMoods[formattedMoods.length - 1][1]
      }],`;
    }
    MoodChart += `]);
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
                      viewWindow: {max: 3, min: -3},
                      format: '##',
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
                },
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
        <WebView source={{ html: MoodChart }} style={styles.chart} />
      </View>
    );
  }
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
  text: {
    marginRight: 25,
  },
  webStyle: {
    backgroundColor: lightBlue,
    width: "100%",
    height: "100%",
  },
});
