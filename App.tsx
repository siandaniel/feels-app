import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import LoggedInUserContext2 from "./contexts/LoggedInUser";
import LoggedInProfessional from "./contexts/LoggedInProfessional";
import Index from "./Index";
import ActiveChat from "./contexts/ActiveChats";
import ProChats from "./contexts/ProChats";

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
    
    return (
      <ProChats>
        <ActiveChat>
          <LoggedInProfessional>
            <LoggedInUserContext2>
              <Index/>
            </LoggedInUserContext2>
          </LoggedInProfessional>
        </ActiveChat>
      </ProChats>
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
