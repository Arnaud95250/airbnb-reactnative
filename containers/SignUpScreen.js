import React, {useState} from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, StyleSheet,TouchableOpacity, Image, ScrollView,KeyboardAvoidingView } from "react-native";
import axios from 'axios';
import Input from '../components/Input';
import InputTexarea from '../components/InputTexarea';

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
          <Input
              setFunction={setEmail} 
              placeholder="email" 
              value={email}
              maxLength={64}
              textContentType="emailAddress"
              >
          </Input> 
          {console.log(email)}

          {/*Input Name*/}
          <Input 
            setFunction={setName} 
            placeholder="name" 
            value={name}
            maxLength={64}
            textContentType="name"
          >
          </Input> 
          {console.log(name)}

          {/*Input Déscription*/}
          <InputTexarea 
            setFunction={setDescription} 
            placeholder="description"
            placeholderTextColor="#FF5A5F"
            value={description}
            maxLength={256}
            >
          </InputTexarea>
          {console.log(description)}

          {/*Input password*/}
          <Input
            setFunction={setPassword} 
            placeholder="password" 
            value={password}
            maxLength={256}
            secureTextEntry={true}
            textContentType={password}
          >
          </Input> 
          {console.log(password)}

          {/*Input confirm password*/}
          <Input
            setFunction={setConfirmPassword} 
            placeholder="Confirmé votre mot-de-passe" 
            maxLength={256}
            secureTextEntry={true}
            textContentType={password}
            >
          </Input> 
          {console.log(confirmPassword)}

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