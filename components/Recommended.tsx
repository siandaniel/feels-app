import { View, Text, StyleSheet, ScrollView } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import RecommendedCard from "./RecommendedCard";

export default function Recommended() {
  return (
    <View style={styles.recommendedContainer}>
      <Text style={styles.header}>For You</Text>
      <View style={styles.scroller}>
        <ScrollView
          contentContainerStyle={styles.sideScroller}
          horizontal={true}
        >
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
          <RecommendedCard />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  recommendedContainer: {
    height: 290,
  },
  header: {
    color: white,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
  },
  scroller: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  sideScroller: {
    minWidth: "100%",
    justifyContent: "center",
    height: 245,
    paddingLeft: 11,
    paddingRight: 11,
  },
  text: {
    fontSize: 50,
  },
});
