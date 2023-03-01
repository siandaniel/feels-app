import { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { blue, white } from "../assets/colours";
import WaitingRoomCard from "../components/WaitingRoomCard";

function WaitingRoom() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.page}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.text}>Waiting Room</Text>
        <WaitingRoomCard
          username={"Tom"}
          avatar_url={
            "https://images.pexels.com/photos/913390/pexels-photo-913390.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          chatTopics={
            "I run a shop and its taken over my life! I'm struggling to maintain a work life balance "
          }
        />
        <WaitingRoomCard
          username={"Iris"}
          avatar_url={
            "https://images.pexels.com/photos/1853557/pexels-photo-1853557.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          chatTopics={"I'm getting burnt out how do I cope with these feels"}
        />
        <WaitingRoomCard
          username={"Joe"}
          avatar_url={
            "https://www.tvguide.com/a/img/hub/2019/12/05/9cadb0bf-f87e-4383-ac1b-adf596690a15/you-reg.jpg"
          }
          chatTopics={
            "Hello, you... No! I'm not doing that again. I'm obsessive and I can't control it"
          }
        />
        <WaitingRoomCard
          username={"Tom"}
          avatar_url={
            "https://images.pexels.com/photos/913390/pexels-photo-913390.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          chatTopics={
            "I run a shop and its taken over my life! I'm struggling to maintain a work life balance"
          }
        />
        <WaitingRoomCard
          username={"Iris"}
          avatar_url={
            "https://images.pexels.com/photos/1853557/pexels-photo-1853557.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          chatTopics={"I'm getting burnt out how do I cope with these feels"}
        />
        <WaitingRoomCard
          username={"Joe"}
          avatar_url={
            "https://www.tvguide.com/a/img/hub/2019/12/05/9cadb0bf-f87e-4383-ac1b-adf596690a15/you-reg.jpg"
          }
          chatTopics={
            "Hello, you... No! I'm not doing that again. I'm obsessive and I can't control it"
          }
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: blue,
    minHeight: "100%",
    alignItems: "center",
    paddingTop: 60,
  },
  scroller: {},
  text: {
    marginBottom: 20,
    color: white,
    fontSize: 25,
  },
});

export default WaitingRoom;
