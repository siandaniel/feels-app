import { blue, orange, white } from "./assets/colours";
import MoodTrackingPage from "./pages/MoodTrackingPage";
import ProfilePage from "./pages/TestPage";
import GetHelpPage from "./pages/GetHelpPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
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
            if (route.name === "Get Help") {
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
            }
          },
          tabBarActiveTintColor: blue,
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Profile" component={ProfilePage} />
        <Tab.Screen name="Insights" component={MoodTrackingPage} />
        <Tab.Screen
          name="Get Help"
          component={GetHelpPage}
          options={{ tabBarBadge: 1 }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
