import React, {useState} from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, StyleSheet,TouchableOpacity, Image, ScrollView,KeyboardAvoidingView } from "react-native";
import axios from 'axios';

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createUser = async () => {
    if(email && name && description){
      if(password === confirmPassword){
        try {
            const response = await axios.post("https://express-airbnb-api.herokuapp.com/user/sign_up",{
              email: email,
              username: name,
              description: description,
              password: password,
            }
            )
            setToken(response.data.token);
            console.log(response.data);
            alert("Félicitation vous êtes inscrit!");
          } catch (error) {
            console.log(error.response);
            alert("L'adresse email existe déjà");
          };
        } else {
          alert("Les mots de passe saisis ne sont pas identiques")
      }
    } else {
      alert("vous n'avez pas rempli tous les champs obligatoires")
    }
  } 

  return (
    <KeyboardAvoidingView>
    <ScrollView>
    <View style={styles.container}>
        <View style={styles.form}>
          <View>
            <Image source={require('../assets/logo0.png')} style={styles.logo}></Image>
          </View>

          <Text style={styles.title}>Inscription</Text>

          {/*Input Email*/}
          <TextInput 
            style={styles.inputText} 
            onChangeText={(event) => {setEmail(event)}}
            placeholder="Email"
            placeholderTextColor="#FF5A5F" 
            value={email}
            maxLength={64}
            textContentType="emailAddress"
            >
          </TextInput>
          {console.log(email)}

          {/*Input Name*/}
          <TextInput 
            style={styles.inputText} 
            onChangeText={(event) => {setName(event)}}
            placeholder="Name" 
            placeholderTextColor="#FF5A5F"
            value={name}
            maxLength={64}
            textContentType="name"
            >
          </TextInput>
          {console.log(name)}

          {/*Input Déscription*/}
          <TextInput 
            style={styles.input_texarea} 
            onChangeText={(event) => {setDescription(event)}}
            placeholder="description"
            placeholderTextColor="#FF5A5F"
            value={description}
            maxLength={256}
            multiline={true}
            numberOfLines={5} 
            
            textContentType="password">
          </TextInput>
          {console.log(description)}

          {/*Input password*/}
          <TextInput 
            style={styles.inputText}
            onChangeText={(event) => {setPassword(event)}} 
            placeholder="Password" 
            placeholderTextColor="#FF5A5F"
            value={password}
            maxLength={64}
            secureTextEntry={true}
            textContentType="password"
            >
          </TextInput>
          {console.log(password)}

          {/*Input confirm password*/}
          <TextInput 
            style={styles.inputText} 
            onChangeText={(confirmPassword) => {setConfirmPassword(confirmPassword)}}
            placeholder="Confirmé votre mot-de-passe" 
            placeholderTextColor="#FF5A5F"
            maxLength={64}
            secureTextEntry={true}
            textContentType="password"
            >
          </TextInput>

          {/*Button Submit formulaire active function createUser*/}
          <TouchableOpacity
            style={{margin:20}}
            onPress={createUser}
        >
            <Text style={styles.button_submit} >Valider</Text>
          </TouchableOpacity>
          
          {/*Button navigate page SignIn*/}
          <TouchableOpacity
              onPress={() => {navigation.navigate("SignIn")}}>
            <Text>Connectez vous</Text>
          </TouchableOpacity>

          {/*Button */}
          {/* <Button title="Sign up" color="#FF5A5F" onPress={async () => {const userToken = "secret-token";setToken(userToken);}} /> */}
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
    borderBottomWidth: 1,
    padding: 10,
    width: "70%",
    marginBottom: 20
  },
  input_texarea:{
    borderColor: "#FF5A5F",
    borderWidth: 1,
    width: "70%",
    opacity: 0.4,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    padding:10,
    margin:10
  },
  button_submit:{
    fontSize:20,
    lineHeight: 50,
    textAlign: "center",
    width: 200,
    borderColor: "#FF5A5F",
    borderWidth: 1,
    borderColor: "#FF5A5F",
    borderRadius: 100,
  }
})