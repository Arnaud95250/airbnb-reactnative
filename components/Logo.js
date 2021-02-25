import React from "react";
import {Image, View,StyleSheet} from "react-native";

const Logo = () => {
    // console.log("Component Logo");
    return(
        <View style={styles.content_logo}>
            <Image source={require('../assets/logo0.png')} style={styles.logo}></Image>
        </View>
    )
}

export default Logo;

const styles = StyleSheet.create({
    content_logo: {
        borderBottomWidth: 2, 
        borderColor: "#FF5A5F", 
        width:"100%", 
        alignItems: "center", 
        height: 50
      },
      logo:{
        width: 50,
        height: 50,
      },
})