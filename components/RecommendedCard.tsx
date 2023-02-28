import { StyleSheet, View, Text, ImageBackground, Linking } from "react-native";
import { black, lightBlue, white } from "../assets/colours";

interface Props {
  imageSrc: any;
  title: string;
  url: string;
}

export default function RecommendedCard({ imageSrc, title, url }: Props) {
  return (
    <ImageBackground
      style={styles.recContainer}
      imageStyle={{ borderRadius: 25 }}
      source={imageSrc}
    >
      <View style={styles.textBkgnd}>
        <Text style={styles.title} onPress={() => Linking.openURL(url)}>
          {title}
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  recContainer: {
    borderRadius: 25,
    marginHorizontal: 4,
    height: 230,
    width: 160,
    backgroundColor: lightBlue,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 18,
    marginTop: 2,
    marginBottom: 5,
    color: black,
  },
  textBkgnd: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 8,
    minHeight: 50,
    width: "100%",
    borderBottomStartRadius: 25,
    borderBottomEndRadius: 25,
  },
});
