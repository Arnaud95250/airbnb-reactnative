import React from "react";
import { View, Text, FlatList, StyleSheet, Image, ScrollView,TouchableHighlight, ActivityIndicator, TouchableWithoutFeedback } from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/core";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import axios from 'axios';

import { FontAwesome } from '@expo/vector-icons';


function RoomScreen({setToken}) {
    const navigation = useNavigation();
    const route = useRoute();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try{  
            console.log("toto0000");
            const response = await axios.get(`https://express-airbnb-api.herokuapp.com/rooms/${route.params.roomId}`);
            console.log(response.data.title);
            setData(response.data)
            setIsLoading(false);
        } catch (error){
            console.log(error.message);
        }
    };
    fetchData();
  }, []);

    return(
        <ScrollView>
        <View style={styles.room}>
            {/* <View style={styles.content_logo}>
                <Image source={require('../assets/logo0.png')} style={styles.logo}></Image>
            </View> */}
            {isLoading ? (
                <ActivityIndicator style={{marginTop: 150}} size="large" color="#FF5A5F" />
            ) : (
                <View>
                    <ScrollView horizontal={true}>
                    <View style={{ flexDirection: "row" }}>
                        {data.photos.map((elem) => {
                            // console.log(elem.url);
                            return (
                            <Image key={elem.picture_id} source={{ uri: elem.url }} style={styles.img}></Image>
                            // <Image style={styles.img} source={{ uri:img.url}}/>
                            );
                        })}
                        
                    </View>
                    </ScrollView>
                    <Text style={styles.price}>{data.price} €</Text>
                    <View style={styles.content_infos}>
                        <View style={{width: "70%"}}>
                            
                            <Text style={styles.title} numberOfLines={1}>{data.title}</Text>
                            <View style={{flexDirection:"row", justifyContent: "space-between", width: 200, alignItems: "center", height:40}}>
                              <FontAwesome name="star" size={20} color="rgb(255, 177, 1)" />
                              <FontAwesome name="star" size={20} color="rgb(255, 177, 1)" />
                              <FontAwesome name="star" size={20} color="rgb(255, 177, 1)" />
                              <FontAwesome name="star" size={20} color="rgb(255, 177, 1)" />
                              <FontAwesome name="star-o" size={20} color="rgb(255, 177, 1)"/>
                              <View style={{height:30}}>
                                <Text style={styles.reviews}>{data.reviews} reviews</Text>
                              </View>
                            </View>
                        </View>
                        <View style={styles.content_user}>
                            <Image style={styles.user} source={{ uri:data.user.account.photo.url }}/>
                        </View>
                      </View>
                    
                   

                    <View style={styles.description}>
                        <TouchableWithoutFeedback onPress={() => setViewMore(!viewMore)}>
                            <Text style={styles.description_text} //le texte se déroule au toucher:
                                numberOfLines={viewMore ? null : 3}
                            >{data.description}
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>


                    {/* LOCATION */}
                    <View style={{ flex: 1}}>
                        <MapView
                        //map fixe:
                        scrollEnabled={false}
                        provider={PROVIDER_GOOGLE}
                        style={{ width: "100%", height: 200 }}
                        initialRegion={{
                            latitude: 48.856614,
                            longitude: 2.3522219,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        showUserLocation={true}
                        >
                        <MapView.Marker
                            title={data.title}
                            description={data.description}
                            coordinate={{ latitude: data.location[1], longitude: data.location[0] }}
                        />
                        </MapView>
                    </View>
                </View>
            )}
        </View>
    </ScrollView>
    )
}
  
export default RoomScreen;
  
const styles = StyleSheet.create({
    room:{
        backgroundColor: "white",
        flex: 1,
    },
    container:{
        backgroundColor: "white",
        borderWidth: 2,
        borderColor: "grey",
        margin: 10,
        borderRadius: 7
    },
    carousel: {
        height: 200, 
    },
    user:{
        width: 75,
        height:75,
        borderRadius: 100
      },
    logo:{
        width: 50,
        height: 50,
    },
    content_img:{
        height: 150,
        width: "100%",
        flexDirection: "row",
        
    },
    img:{
        width: 470,
        height:225,
        marginRight:10,
    },
    content_infos:{
        justifyContent: "space-between",
        flexDirection: "row",
        paddingRight: 15,
        paddingLeft: 15,
        paddingTop: 15,
      },
    user:{
        width: 60,
        height:60,
        borderRadius: 100
      },
      title: {
        width: "110%",
        fontSize: 20,
        color: "black",
        overflow: "hidden",
      },
      reviews: {
        marginTop: 10,
        fontSize: 20,
        color: "black",
        overflow: "hidden",
        lineHeight: 16,
        fontSize: 16,
        color: "rgb(166, 176, 179)",
        opacity: 0.5
      },
      description:{
          paddingHorizontal: 18, 
          marginBottom: 10
      },
      description_text:{ 
          fontSize: 18, 
          lineHeight: 30 },
      price:{
          fontSize:20,
          fontWeight: "bold",
          backgroundColor:"black",
          width: 70,
          lineHeight:50,
          color: "white",
          textAlign: "center",
          position: 'absolute',
          left:0,
          top:170,
      }
});