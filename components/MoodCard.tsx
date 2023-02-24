import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { orange } from "../assets/colours";

interface Props {
  mood: String;
  setMoodDesc: Dispatch<SetStateAction<String>>;
}

export default function MoodCard({ mood, setMoodDesc }: Props) {
  const [selected, setSelected] = useState<Boolean>(false);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (selected === false) {
          setSelected(true)
          setMoodDesc(mood);
        } else {
          setSelected(false);
          setMoodDesc("");
        }
      }}
    >
      <View
        style={styles.cardContainer as any}
      >
        <View style={styles.placeholder}></View>
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
    marginTop: 10,
    fontSize: 19,
  },
  placeholder: {
    backgroundColor: orange,
    borderRadius: 60,
    height: 110,
    width: 110,
  },
};
