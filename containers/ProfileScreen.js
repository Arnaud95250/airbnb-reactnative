import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import axios from 'axios';


const ProfileScreen = (setId, setToken) => {
  const  route  = useRoute();
  console.log(route);
  console.log(setToken);
  console.log(setId);


  return (
    <View>
      {/* <Text>user id : {route.params.userId}</Text> */}
      <Text>user id : </Text>
    </View>
  )
}

export default ProfileScreen;





















