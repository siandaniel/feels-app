import { Text, View, StyleSheet, ScrollView, Modal, Pressable, Button } from "react-native";
import MoodCard from "./MoodCard";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { Dispatch, SetStateAction } from "react";

interface Props {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>
}

export default function Moodal({showModal, setShowModal}: Props) {

    return (
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}
            presentationStyle="overFullScreen">
            <View style={styles.background}>
              <View style={styles.modal}>
                <Pressable style={styles.close} onPress={() => {
                        setShowModal(false)
                    }}>
                    <Text style={styles.closeText}>x</Text>
                </Pressable>
                <Text style={styles.header}>Track Your Feels</Text>
                <ScrollView contentContainerStyle={styles.sideScroll} horizontal={true}>
                    <MoodCard mood="Joyful"/>
                    <MoodCard mood="Happy"/>
                    <MoodCard mood="Just Okay"/>
                    <MoodCard mood="Neutral"/>
                    <MoodCard mood="A Bit Low"/>
                    <MoodCard mood="Sad"/>
                    <MoodCard mood="Depressed"/>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
        background: {
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        close: {
            alignSelf: "flex-end",
            paddingRight: 20,
            height: 30,
        },
        closeText: {
            fontSize: 26,
            marginBottom: 5,
            color: "#666"
        },
        header: {
            fontSize: 27,
            textAlign: 'center',
        },
        modal: {
            margin: 20,
            backgroundColor: white,
            borderRadius: 20,
            alignItems: 'center',
            shadowColor: black,
            height: 300,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            paddingTop: 12
        },
        sideScroll: {
            alignItems: "center",
            height: 200,
            paddingLeft: 10,
            paddingRight: 10,
        },
    });