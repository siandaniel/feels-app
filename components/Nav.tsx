import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MoodTrackingPage from "../pages/MoodTrackingPage";
import TestPage from "../pages/TestPage";

const Tab = createBottomTabNavigator();

export default function Nav() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="MoodTrackingPage" component={MoodTrackingPage} />
      {/* <Tab.Screen name="TestPage" component={TestPage} /> */}
    </Tab.Navigator>
  );
}
