import { View, Text, TouchableWithoutFeedback, Image } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { orange } from "../assets/colours";

interface Props {
  mood: String;
  setMoodDesc: Dispatch<SetStateAction<String>>;
  image: any;
}

export default function MoodCard({ mood, setMoodDesc, image }: Props) {
  const [selected, setSelected] = useState<Boolean>(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (selected === false) {
          setSelected(true);
          setMoodDesc(mood);
        } else {
          setSelected(false);
          setMoodDesc("");
        }
      }}
    >
      <View style={styles.cardContainer as any}>
        <Image source={image} style={styles.placeholder}></Image>
        <Text style={styles.moodText}>{mood}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = {
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 190,
    marginHorizontal: 10,
  },
  moodText: {
    fontSize: 19,
  },
  placeholder: {
    borderRadius: 60,
    height: 120,
    width: 120,
  },
};
