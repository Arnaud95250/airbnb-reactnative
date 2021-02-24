import React, {useState}from "react";
import axios from 'axios';
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity, StyleSheet,Image, ScrollView, KeyboardAvoidingView } from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const loginClick = async () => {
    try {
        const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/log_in",{
            email: email,
            password: password,
          }
        )
        setToken(response.data.token);
        console.log(response.data);
        alert("Vous êtes connecté!");
    } catch (error) {
      console.log(error.response);
      alert(error.response.data.error);
    };
  }

  return (
    <KeyboardAvoidingView>
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.form}>
          <View>
            <Image source={require('../assets/logo0.png')} style={styles.logo}></Image>
          </View>

          <Text style={styles.title}>Connexion</Text>

          {/*Input Email*/}
          <TextInput 
            style={styles.inputText} 
            onChangeText={(event) => {setEmail(event)}}
            placeholder="Email"
            placeholderTextColor="#FF5A5F"
            maxLength={64} 
            value={email}
            textContentType="emailAddress"
            >
          </TextInput>
          {console.log(email)}

          {/*Input Password*/}
          <TextInput 
            style={styles.inputText} 
            onChangeText={(event) => {setPassword(event)}} 
            placeholder="Password" 
            placeholderTextColor="#FF5A5F"
            maxLength={64}
            value={password}
            secureTextEntry={true}
            textContentType="password"
            >
          </TextInput>
          {console.log(password)}

          {/*Button Submit formulaire*/}
          <TouchableOpacity
           style={{margin:20}}
            onPress={loginClick} >
            <Text style={styles.button_submit} >Valider</Text>
          </TouchableOpacity>

          {/*Button navigate page SignUp*/}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}>
            <Text >Inscrivez-vous</Text>
          </TouchableOpacity>

          {/*Button*/}
          {/* <Button title="Sign up" color="#FF5A5F"  onPress={async () => {const userToken = "secret-token";setToken(userToken);}} /> */}
        </View>
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  form:{
    alignItems: "center"
  },
  logo:{
    marginTop:20,
    width: 150,
    height:150
  },
  title:{
    fontSize:30,
    marginBottom: 20,
    color: "#767676" 
  },
  inputText:{
    borderColor: "#FF5A5F",
    opacity: 0.4,
    borderBottomWidth: 2,
    padding: 10,
    width: "70%",
    marginBottom: 20
  },
  button_submit:{
    fontSize:20,
    lineHeight: 50,
    textAlign: "center",
    width: 200,
    borderColor: "#FF5A5F",
    borderWidth: 2,
    borderColor: "#FF5A5F",
    borderRadius: 100,
  }
})