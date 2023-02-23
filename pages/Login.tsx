import { useState } from 'react'
import {Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard} from 'react-native'
import LoginPressable from '../components/LoginPressable'
import SignInPro from '../components/SignInPro'
import SignInUser from '../components/SignInUser'
const { lightBlue, blue, orange, black, white } = require("../assets/colours");

const Login = () => {
    const [isUser, setIsUser] = useState(true)
    

return <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
<View style={styles.container}>
  <SignInUser hidden={isUser}/>
  <SignInPro hidden={!isUser}/>  
    <LoginPressable  text='press' onPress={() => setIsUser(current => !current)} isPrimary={false}/></View>
    </TouchableWithoutFeedback>

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      alignSelf: "stretch",
      padding: 25,
      paddingVertical: 100,
      backgroundColor: blue,
    },
  });




export default Login