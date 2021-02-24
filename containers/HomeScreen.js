import React from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";

export default function HomeScreen({setToken}) {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, backgroundColor:"#767676", alignItems:"center"}}>
      <Text style={{margin: 50, color: "white", fontSize: 20}}>Bienvenue sur la page Home!</Text>

      <View style={{alignItems:"center" ,width: '50%', height: '30%',}}>
        <Button
          title="Navigation page Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: setToken });
          }}
        />
      </View>
      
    </View>
  );
}
