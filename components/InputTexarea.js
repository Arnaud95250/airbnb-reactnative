import React from "react";
import {TextInput,StyleSheet} from "react-native";

const InputTexarea = ({setFunction, placeholder, value, numberOfLines, maxLength}) => {
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
            multiline={true}
        >
        </TextInput>            
    )
}

export default InputTexarea;

const styles = StyleSheet.create({
    input:{
        borderColor: "#FF5A5F",
        borderWidth: 1,
        width: "70%",
        height:100,
        opacity: 0.4,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        padding:10,
        margin:10
      },
})













// <TextInput 
// style={styles.input_texarea} 
// onChangeText={(event) => {setDescription(event)}}
// placeholder="description"
// placeholderTextColor="#FF5A5F"
// value={description}
// maxLength={256}
// multiline={true}
// numberOfLines={5} 
// </TextInput>
// {console.log(description)}

