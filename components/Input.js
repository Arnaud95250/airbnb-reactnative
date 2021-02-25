import React from "react";
import {TextInput,StyleSheet} from "react-native";

const Input = ({setFunction, placeholder, value, maxLength, secureTextEntry, textContentType}) => {
    // console.log("Component Input");
    return(
        <TextInput 
            style={styles.input} 
            onChangeText={(text) => {
                setFunction(text);
            }}
            placeholder={placeholder} 
            placeholderTextColor="#FF5A5F"
            value={value}
            maxLength={maxLength}
            secureTextEntry={secureTextEntry}
            textContentType={textContentType}
        >
        </TextInput>

                        
    )
}

export default Input;

const styles = StyleSheet.create({
    input:{
        borderColor: "#FF5A5F",
        opacity: 0.4,
        borderBottomWidth: 2,
        padding: 10,
        width: "70%",
        marginBottom: 20
      },
})














// {/*Input Email*/}
// <TextInput 
// style={styles.inputText} 
// onChangeText={(event) => {setEmail(event)}}
// placeholder="Email"
// placeholderTextColor="#FF5A5F" 
// value={email}
// maxLength={64}
// textContentType="emailAddress"
// >
// </TextInput>
// {console.log(email)}

// {/*Input Name*/}
// <TextInput 
// style={styles.inputText} 
// onChangeText={(event) => {setName(event)}}
// placeholder="Name" 
// placeholderTextColor="#FF5A5F"
// value={name}
// maxLength={64}
// textContentType="name"
// >
// </TextInput>
// {console.log(name)}

// {/*Input Déscription*/}
// <TextInput 
// style={styles.input_texarea} 
// onChangeText={(event) => {setDescription(event)}}
// placeholder="description"
// placeholderTextColor="#FF5A5F"
// value={description}
// maxLength={256}
// multiline={true}
// numberOfLines={5} 

// textContentType="password">
// </TextInput>
// {console.log(description)}

// {/*Input password*/}
// <TextInput 
// style={styles.inputText}
// onChangeText={(event) => {setPassword(event)}} 
// placeholder="Password" 
// placeholderTextColor="#FF5A5F"
// value={password}
// maxLength={64}
// secureTextEntry={true}
// textContentType="password"
// >
// </TextInput>
// {console.log(password)}

// {/*Input confirm password*/}
// <TextInput 
// style={styles.inputText} 
// onChangeText={(confirmPassword) => {setConfirmPassword(confirmPassword)}}
// placeholder="Confirmé votre mot-de-passe" 
// placeholderTextColor="#FF5A5F"
// maxLength={64}
// secureTextEntry={true}
// textContentType="password"
// >
// </TextInput>