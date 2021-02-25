import React from "react";
import { View, Image, StyleSheet, ActivityIndicator, Text } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import * as Location from "expo-location";
import MapView, { Callout, PROVIDER_GOOGLE } from "react-native-maps";
import axios from 'axios';
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedback  } from "react-native-gesture-handler";

function AroundMeScreen({setToken}) {
    const navigation = useNavigation();
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [viewMore, setViewMore] = useState(false);
    const [coords, setCoords] = useState();

    
    const width = Dimensions.get("window").width;
    const height = Dimensions.get("window").height;
    

    useEffect(() => {
        const fetchData = async () => {
            try{  
                const response = await axios.get("https://express-airbnb-api.herokuapp.com/rooms");
                // console.log(response.data);
                setData(response.data)
                setIsLoading(false);
            } catch (error){
                console.log(error.message);
            }
        };
    
        const askPermission = async () => {
            let { status } = await Location.requestPermissionsAsync();
            if (status === "granted") {
                let location = await Location.getCurrentPositionAsync({});
                console.log("location =>", location); // console.log permettant de visualiser l'objet obtenu
                const obj = {
                    latitude: 48.856614,
                    longitude: 2.3522219,
                    // latitudeDelta: 0.5,
                    // longitudeDelta: 0.5,
                };
                setCoords(obj);
            }
            }
        askPermission();
        fetchData();
    }, []);



    return(
        <View style={styles.around}>
            {isLoading ? (
                <ActivityIndicator style={{marginTop: 150}} size="large" color="#FF5A5F" />
            ):(
                <View>
                    <MapView
                    //map fixe:
                    
                    scrollEnabled={true}
                    provider={PROVIDER_GOOGLE}
                    style={{ width: width, height: height }} // Correspnt à 2 variable en haut de page qui permettent de prendre la hauteur et largeur total d'un téléphone
                    initialRegion={{
                        latitude: 48.856614,
                        longitude: 2.3522219,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}
                    showUserLocation={true}
                    >

                    <View >
                        {data.map((item, index) => { 
                            // console.log(item.location[0])
                            return (
                                <MapView.Marker
                                    key={item._id}
                                    coordinate={{ 
                                        latitude: item.location[1], 
                                        longitude: item.location[0] 
                                    }}
                                    >

                                    <Callout style={styles.callout} onPress={() => {
                                        navigation.navigate("Room", { roomId: item._id });
                                        }}>
                                        <Image source={{ uri: item.photos[0].url }} style={styles.img}/>
                                        <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                        <Text numberOfLines={1} style={styles.description}>{item.description}</Text>
                                    </Callout>
                                </MapView.Marker>
                                )
                            })}
                        </View>
                    </MapView>
                </View>
                )
            }
        </View>
        )
    }
export default AroundMeScreen;

  
const styles = StyleSheet.create({
    around:{
        backgroundColor: "white",
        flex: 1,
    },
    room_info:{
        width: 250,
        backgroundColor: "red",
        borderRadius: 20
    },
    callout:{
        width: 300,
    },
    img:{
        height: 100, 
        width:300,
    },
    title:{
        overflow: "hidden",
    },
    description:{                                                                       
        overflow: "hidden",
    }
});