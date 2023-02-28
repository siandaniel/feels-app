import { View, Text, StyleSheet, ScrollView } from "react-native";
import { white } from "../assets/colours";
import RecommendedCard from "./RecommendedCard";
import articles from "../assets/articles";

interface Props {
  todaysMood: string;
}

export default function Recommended({ todaysMood }: Props) {
  const moodArticles = articles.filter((article) =>
    article.moodRange.includes(todaysMood)
  );
  return (
    <View style={styles.recommendedContainer}>
      <Text style={styles.header}>For You</Text>
      <View style={styles.scroller}>
        <ScrollView
          contentContainerStyle={styles.sideScroller}
          horizontal={true}
        >
          {!todaysMood &&
            articles.map((article) => {
              return (
                <RecommendedCard
                  key={article.id}
                  imageSrc={article.imageTitle}
                  title={article.title}
                  url={article.articleLink}
                />
              );
            })}
          {todaysMood &&
            moodArticles.map((article) => {
              return (
                <RecommendedCard
                  key={article.id}
                  imageSrc={article.imageTitle}
                  title={article.title}
                  url={article.articleLink}
                />
              );
            })}
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
