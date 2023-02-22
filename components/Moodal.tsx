import { Text, View, StyleSheet, ScrollView, Modal, Pressable } from "react-native";
import MoodCard from "./MoodCard";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { Dispatch, SetStateAction } from "react";

interface Props {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function Moodal({showModal, setShowModal}: Props) {

    return (
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
            presentationStyle="overFullScreen">
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Track Your Feels</Text>
                <ScrollView contentContainerStyle={styles.sideScroll} horizontal={true}>
                    <MoodCard mood="Depressed"/>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        sideScroll: {
            height: 70,
            borderColor: "pink",
            borderWidth: 2
        },
      centeredView: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        height: 250,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
    });









//     return (
//         <View style={styles.moodal}>
//             <Modal style={styles.moodalContent}>
//                 <Text>Track Your Feels</Text>
//                 <ScrollView contentContainerStyle={styles.sideScroller} horizontal={true}>
//                     <MoodCard mood={"Depressed"}/>
//                     <MoodCard mood={"Sad"}/>
//                     <MoodCard mood={"A Bit Low"}/>
//                     <MoodCard mood={"Neutral"}/>
//                     <MoodCard mood={"Okay"}/>
//                     <MoodCard mood={"Happy"}/>
//                     <MoodCard mood={"Very Happy"}/>
//                 </ScrollView>
//             </Modal>
//         </View>
//     );
//   }

//   const styles = StyleSheet.create({
//     moodal: {
//         height: "100%",
//         width: "100%"
//     },
//     moodalContent: {
//         height: 200,
//         width: 300
//     },
//     sideScroller: {
//         minWidth: "100%",
//         height: 350,
//         padding: 10,
//     },
//     text: {
//         fontSize: 50,
//     }
// })