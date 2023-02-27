import { blue, orange, white } from "./assets/colours";
import MoodTrackingPage from "./pages/MoodTrackingPage";
import ProfilePage from "./pages/TestPage";
import GetHelpPage from "./pages/GetHelpPage";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    Lobster: require("./assets/fonts/Lobster-Regular.ttf"),
  });

  if (!fontsLoaded)
    return (
      <View style={styles.container}>
        <Text>Loading fonts</Text>
      </View>
    );

  return <SignUp />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
