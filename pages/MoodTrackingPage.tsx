import { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  LogBox,
} from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import Chart from "../components/Chart";
import Mood from "../components/Mood";
import Moodal from "../components/Moodal";
import Recommended from "../components/Recommended";
import { getOneUser, getUserMoods } from "../utils/api";
import { todaysDate } from "../utils/todaysDate";

interface loggedInUser {
  _id: String;
  username: String;
  email: String;
  date_of_birth: String;
  date_joined: String;
  avatar_url: String;
  _v: Number;
  createdAt: String;
  updatedAt: String;
}

export default function MoodTrackingPage() {
  const [userMoods, setUserMoods] = useState<Array<Object>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todaysMood, setTodaysMood] = useState<String>("");
  const [loggedInUser, setLoggedInUser] = useState<loggedInUser>({
    _id: "",
    username: "",
    email: "",
    date_of_birth: "",
    date_joined: "",
    avatar_url: "",
    _v: 0,
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    // Hard coded "Tom" for now - change later!
    getOneUser("Joey").then((user) => {
      setLoggedInUser(user);
    });
    getUserMoods("Joey")
      .then((userMoodsFromApi) => {
        setUserMoods(userMoodsFromApi.mood_data);
        if (!checkUserMoods(userMoodsFromApi.mood_data)) {
          setShowModal(true);
        } else {
          setShowModal(false);
          const todaysLoggedMood =
            userMoodsFromApi.mood_data[userMoodsFromApi.mood_data.length - 1][
              todaysDate
            ];
          if (todaysLoggedMood === 3) {
            setTodaysMood("Joyful");
          } else if (todaysLoggedMood === 2) {
            setTodaysMood("Happy");
          } else if (todaysLoggedMood === 1) {
            setTodaysMood("Just Okay");
          } else if (todaysLoggedMood === 0) {
            setTodaysMood("Neutral");
          } else if (todaysLoggedMood === -1) {
            setTodaysMood("A Bit Low");
          } else if (todaysLoggedMood === -2) {
            setTodaysMood("Sad");
          } else if (todaysLoggedMood === -3) {
            setTodaysMood("Depressed");
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const checkUserMoods = (data: Array<Object>) => {
    const trackedDays = data.map((mood) => Object.keys(mood)[0]);
    return trackedDays.includes(todaysDate);
  };

  return (
    <View>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.chart}>
          <Chart />
        </View>
        <View style={styles.mood}>
          <Mood todaysMood={todaysMood} setShowModal={setShowModal} />
        </View>
        <View style={styles.recommended}>
          <Recommended />
        </View>
        {showModal && (
          <Moodal
            showModal={showModal}
            setShowModal={setShowModal}
            setTodaysMood={setTodaysMood}
            loggedInUser={loggedInUser}
            setUserMoods={setUserMoods}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: blue,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100%",
  },
  chart: {
    width: "100%",
  },
  mood: {
    width: "100%",
  },
  recommended: {
    width: "100%",
  },
});
