import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  ShadowPropTypesIOS,
} from "react-native";
import MoodCard from "./MoodCard";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { Dispatch, SetStateAction, useState } from "react";
import { todaysDate } from "../utils/todaysDate";
import { updateUserMood } from "../utils/api";
import { Moods } from "../pages/MoodTrackingPage";

const depressed = require("../assets/depressed.png");
const sad = require("../assets/sad.png");
const abitlow = require("../assets/abitlow.png");
const neutral = require("../assets/neutral.png");
const justokay = require("../assets/justokay.png");
const happy = require("../assets/happy.png");
const joyful = require("../assets/joyful.png");

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

interface Props {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setTodaysMood: Dispatch<SetStateAction<string>>;
  loggedInUser: loggedInUser;
  setUserMoods: Dispatch<SetStateAction<Array<Object>>>;
}

export default function Moodal({
  showModal,
  setShowModal,
  setTodaysMood,
  loggedInUser,
  setUserMoods,
}: Props) {
  const [moodDesc, setMoodDesc] = useState("");

  const updateMood = (moodDesc: string) => {
    if (moodDesc === Moods.JOYFUL) {
      updateUserMood(loggedInUser.username, { [todaysDate]: 3 }).then(
        (updatedMoods) => {
          const moodValue = updatedMoods[updatedMoods.length - 1][todaysDate];
          if (moodValue === 3) {
            setTodaysMood(moodDesc);
          }
        }
      );
    } else if (moodDesc === Moods.HAPPY) {
      updateUserMood(loggedInUser.username, { [todaysDate]: 2 }).then(
        (updatedMoods) => {
          const moodValue = updatedMoods[updatedMoods.length - 1][todaysDate];
          if (moodValue === 2) {
            setTodaysMood(moodDesc);
          }
        }
      );
    } else if (moodDesc === Moods.JUST_OKAY) {
      updateUserMood(loggedInUser.username, { [todaysDate]: 1 }).then(
        (updatedMoods) => {
          const moodValue = updatedMoods[updatedMoods.length - 1][todaysDate];
          if (moodValue === 1) {
            setTodaysMood(moodDesc);
          }
        }
      );
    } else if (moodDesc === Moods.NEUTRAL) {
      updateUserMood(loggedInUser.username, { [todaysDate]: 0 }).then(
        (updatedMoods) => {
          const moodValue = updatedMoods[updatedMoods.length - 1][todaysDate];
          if (moodValue === 0) {
            setTodaysMood(moodDesc);
          }
        }
      );
    } else if (moodDesc === Moods.A_BIT_LOW) {
      updateUserMood(loggedInUser.username, { [todaysDate]: -1 }).then(
        (updatedMoods) => {
          const moodValue = updatedMoods[updatedMoods.length - 1][todaysDate];
          if (moodValue === -1) {
            setTodaysMood(moodDesc);
          }
        }
      );
    } else if (moodDesc === Moods.SAD) {
      updateUserMood(loggedInUser.username, { [todaysDate]: -2 }).then(
        (updatedMoods) => {
          const moodValue = updatedMoods[updatedMoods.length - 1][todaysDate];
          if (moodValue === -2) {
            setTodaysMood(moodDesc);
          }
        }
      );
    } else if (moodDesc === Moods.DEPRESSED) {
      updateUserMood(loggedInUser.username, { [todaysDate]: -3 }).then(
        (updatedMoods) => {
          const moodValue = updatedMoods[updatedMoods.length - 1][todaysDate];
          if (moodValue === -3) {
            setTodaysMood(moodDesc);
          }
        }
      );
    }
  };

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          setShowModal(!showModal);
        }}
        presentationStyle="overFullScreen"
      >
        <View style={styles.background}>
          <View style={styles.modal}>
            <Pressable
              style={styles.close}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Text style={styles.closeText}>x</Text>
            </Pressable>
            <Text style={styles.header}>Track Your Feels</Text>
            <ScrollView
              contentContainerStyle={styles.sideScroll}
              horizontal={true}
            >
              <MoodCard
                mood="Joyful"
                setMoodDesc={setMoodDesc}
                image={joyful}
              />
              <MoodCard mood="Happy" setMoodDesc={setMoodDesc} image={happy} />
              <MoodCard
                mood="Just Okay"
                setMoodDesc={setMoodDesc}
                image={justokay}
              />
              <MoodCard
                mood="Neutral"
                setMoodDesc={setMoodDesc}
                image={neutral}
              />
              <MoodCard
                mood="A Bit Low"
                setMoodDesc={setMoodDesc}
                image={abitlow}
              />
              <MoodCard mood="Sad" setMoodDesc={setMoodDesc} image={sad} />
              <MoodCard
                mood="Depressed"
                setMoodDesc={setMoodDesc}
                image={depressed}
              />
            </ScrollView>
            {moodDesc !== "" && (
              <>
                <Text style={styles.text}>Feeling {moodDesc}?</Text>
                <Pressable
                  style={styles.submitButton}
                  onPress={() => {
                    console.log(moodDesc);
                    setShowModal(false);
                    updateMood(moodDesc);
                  }}
                >
                  <Text style={styles.submitButtonText}>Track</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  close: {
    alignSelf: "flex-end",
    paddingRight: 20,
    height: 30,
  },
  closeText: {
    fontSize: 26,
    marginBottom: 5,
    color: "#666",
  },
  header: {
    fontSize: 27,
    textAlign: "center",
    marginBottom: 10,
  },
  modal: {
    margin: 20,
    backgroundColor: white,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: black,
    minHeight: 300,
    maxHeight: 370,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingTop: 12,
  },
  sideScroll: {
    alignItems: "center",
    height: 200,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  submitButton: {
    marginBottom: 23,
    backgroundColor: orange,
    padding: 6,
    marginTop: 8,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  submitButtonText: {
    fontSize: 17,
    color: white,
  },
  text: {
    fontSize: 16,
  },
});
