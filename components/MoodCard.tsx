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
        if (!selected) {
          setMoodDesc(mood);
        } else {
          setMoodDesc("");
        }
        setSelected(!selected);
      }}
    >
      <View
        style={
          selected
            ? styles.cardContainerSelected
            : (styles.cardContainer as any)
        }
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
  cardContainerSelected: {
    alignItems: "center",
    justifyContent: "center",
    height: 190,
    marginHorizontal: 10,
    backgroundColor: "pink",
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
