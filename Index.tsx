import { blue, orange, white } from "./assets/colours";
import MoodTrackingPage from "./pages/MoodTrackingPage";
import ProfilePage from "./pages/ProfilePage";
import GetHelpPage from "./pages/GetHelpPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";
import { LoggedInUserContext } from "./contexts/LoggedInUser";
import { LoggedInProfessionalContext } from "./contexts/LoggedInProfessional";
import { loggedInProfessional, loggedInUser } from "./types";
import LoginStack from "./pages/LoginStack";
import WaitingRoom from "./pages/WaitingRoom";

const Tab = createBottomTabNavigator();

export default function Index() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
  });

  const loggedInUserState = useContext(LoggedInUserContext);
  let loggedInUser: loggedInUser | null = null;
  let setLoggedInUser: Dispatch<SetStateAction<loggedInUser | null>>;

  const loggedInProfessionalState = useContext(LoggedInProfessionalContext);
  let loggedInProfessional: loggedInProfessional | null = null;
  let setLoggedInProfessional: Dispatch<
    SetStateAction<loggedInProfessional | null>
  >;

  if (loggedInUserState !== null) {
    loggedInUser = loggedInUserState.loggedInUser;
    setLoggedInUser = loggedInUserState.setLoggedInUser;
  }
  if (loggedInProfessionalState !== null) {
    loggedInProfessional = loggedInProfessionalState.loggedInProfessional;
    setLoggedInProfessional = loggedInProfessionalState.setLoggedInProfessional;
  }

  if (loggedInUser === null && loggedInProfessional === null) {
    return <LoginStack />;
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Insights"
        screenOptions={({ route }) => ({
          tabBarBadgeStyle: {
            backgroundColor: orange,
            fontSize: 13,
            textAlign: "center",
            paddingBottom: 1,
            color: white,
            height: 17,
            width: 14,
          },
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === "Get Help" || route.name === "Chats") {
              return (
                <Ionicons
                  name={"chatbubble-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "Profile") {
              return (
                <Ionicons name="ios-person-outline" size={size} color={color} />
              );
            } else if (route.name === "Insights") {
              return (
                <MaterialIcons name="insights" size={size} color={color} />
              );
            } else if (route.name === "Waiting") {
              return (
                <Ionicons
                  name="ios-people-circle-sharp"
                  size={33}
                  color={color}
                />
              );
            }
          },
          tabBarActiveTintColor: blue,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Profile" component={ProfilePage} />
        {loggedInUserState?.loggedInUser !== null && (
          <Tab.Screen name="Insights" component={MoodTrackingPage} />
        )}
        {loggedInProfessionalState?.loggedInProfessional !== null && (
          <Tab.Screen name="Waiting" component={WaitingRoom} />
        )}
        {loggedInUserState?.loggedInUser !== null && (
          <Tab.Screen
            name="Get Help"
            component={GetHelpPage}
            />
            )}
        {loggedInProfessionalState?.loggedInProfessional !== null && (
          <Tab.Screen
            name="Chats"
            component={GetHelpPage}
            options={{ tabBarBadge: 1 }}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
