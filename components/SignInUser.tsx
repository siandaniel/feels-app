import { View, StyleSheet } from "react-native"
import FormInput from "./FormInput"
import LoginPressable from './LoginPressable'
import { useState } from "react"


interface Props {
    hidden: boolean
}



const SignInUser = ({hidden}: Props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
return <View style={hidden ? styles.hidden : styles.container}>
    <FormInput label='Username' placeholder="username..." onChange={setUsername}/>
    <FormInput label='Password' placeholder="password" secure onChange={setPassword}/>
<LoginPressable text='Log in' onPress={() => {}} isPrimary/>
        </View>

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignSelf: "stretch",
      },
    hidden: {display: 'none'}
})


export default SignInUser