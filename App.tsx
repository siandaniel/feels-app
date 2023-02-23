import { blue } from "./assets/colours";
import MoodTrackingPage from "./pages/MoodTrackingPage";
import ProfilePage from "./pages/TestPage";
import GetHelpPage from "./pages/GetHelpPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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
              return <FontAwesome5 name={"user"} size={size} color={color} />;
            } else if (route.name === "Insights") {
              return (
                <Ionicons
                  name={"chatbubble-outline"}
                  size={size}
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
        <Tab.Screen name="Insights" component={MoodTrackingPage} />
        <Tab.Screen name="Get Help" component={GetHelpPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// screenOptions={{
//   headerShown: false,
//   tabBarIcon: () => {
//     if (route.name === "Get Help") {
//       return <Ionicons name={"chatbubble-outline"} />;
//     }
//   },
// }}
// initialRouteName="Insights"
