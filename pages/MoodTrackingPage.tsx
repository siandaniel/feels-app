import { useState, useEffect, useContext, SetStateAction, Dispatch } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import Chart from "../components/Chart";
import Mood from "../components/Mood";
import Moodal from "../components/Moodal";
import Recommended from "../components/Recommended";
import { getOneUser, getUserMoods } from "../utils/api";
import { todaysDate } from "../utils/todaysDate";
import { LoggedInUserContext } from "../contexts/LoggedInUser";

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

export enum Moods {
  JOYFUL = "Joyful",
  HAPPY = "Happy",
  JUST_OKAY = "Just Okay",
  NEUTRAL = "Neutral",
  A_BIT_LOW = "A Bit Low",
  SAD = "Sad",
  DEPRESSED = "Depressed"
}

export default function MoodTrackingPage() {
  const [userMoods, setUserMoods] = useState<Array<Object>>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [todaysMood, setTodaysMood] = useState<string>("");

  const loggedInUserState = useContext(LoggedInUserContext);
  let loggedInUser: loggedInUser = 
  let setLoggedInUser: Dispatch<SetStateAction<loggedInUser>>;

  if (loggedInUserState !== null) {
    loggedInUser = loggedInUserState.loggedInUser;
    setLoggedInUser = loggedInUserState.setLoggedInUser
  } 


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
            setTodaysMood(Moods.JOYFUL);
          } else if (todaysLoggedMood === 2) {
            setTodaysMood(Moods.HAPPY);
          } else if (todaysLoggedMood === 1) {
            setTodaysMood(Moods.JUST_OKAY);
          } else if (todaysLoggedMood === 0) {
            setTodaysMood(Moods.NEUTRAL);
          } else if (todaysLoggedMood === -1) {
            setTodaysMood(Moods.A_BIT_LOW);
          } else if (todaysLoggedMood === -2) {
            setTodaysMood(Moods.SAD);
          } else if (todaysLoggedMood === -3) {
            setTodaysMood(Moods.DEPRESSED);
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
  if (loggedInUser !== null) {

  }
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
          <Recommended todaysMood={todaysMood}/>
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
