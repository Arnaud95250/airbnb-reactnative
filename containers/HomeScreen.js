import React from "react";
import { View, Text, FlatList, StyleSheet, Image, ScrollView,TouchableOpacity, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigation } from "@react-navigation/core";
import { FontAwesome } from '@expo/vector-icons';

// Components
import Logo from "../components/Logo";

function HomeScreen({setToken}) {


  const navigation = useNavigation();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);


  const displayStars = (ratingValue) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      if (ratingValue >= i) {
        tab.push( <FontAwesome name="star" size={20} color="rgb(255, 177, 1)" key={i} />);
      } else {
        tab.push( <FontAwesome name="star-o" size={20} color="rgb(255, 177, 1)" key={i} />);
      }
    }

    return tab;
  };

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
    fetchData();
  }, []);


  return (
    
    <View style={styles.home}>
      <Logo/>

      {isLoading ? (
          <ActivityIndicator style={{marginTop: 150}} size="large" color="#FF5A5F" />
      ) : (
        <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity   onPress={() =>
                  navigation.navigate("Room", { roomId: item._id })
               }>
                    <View style={styles.container}>
                      <View style={styles.content_img}> 
                          <Image style={styles.img} source={{ uri: item.photos[0].url}}/>
                      </View>
                      <View style={styles.content_infos}>
                        <View style={{width: "70%"}}>
                            
                            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                            <View style={{flexDirection:"row", justifyContent: "space-between", width: 200, alignItems: "center", height:40}}>
                            {displayStars(item.ratingValue)}
                              <View style={{height:30}}>
                                <Text style={styles.reviews}>{item.reviews} reviews</Text>
                              </View>
                            </View>
                        </View>
                        <View style={styles.content_user}>
                            <Image style={styles.user} source={{ uri:item.user.account.photo.url }}/>
                        </View>
                      </View>
                      
                      {/* <Text style={styles.title}>{item.description}</Text> */}
                      {/* <Text style={styles.title}>{item.price}</Text> */}
                    </View>
                </TouchableOpacity>
              )
            }}
            keyExtractor={(item) => item._id}
          >
        </FlatList>
      )}
      
      {/* <View style={{alignItems:"center"}}>
        <Button
          title="Navigation page Profile"
          onPress={() => {
            navigation.navigate("Profile", { userId: setToken });
          }}
        />
      </View> */}
    </View>
    // <View style={{flex: 1, backgroundColor:"#767676", alignItems:"center"}}>
    //   <Text style={{margin: 50, color: "white", fontSize: 20}}>Bienvenue sur la page Home!</Text>
    // </View>
  );
}

export default HomeScreen;


const styles = StyleSheet.create({
  home:{
    flex: 1, 
    alignItems: "center", 
    // justifyContent: "center",
    // backgroundColor: "white"
  },
  container:{
    backgroundColor: "white",
    // borderBottomWidth:2,
    borderWidth: 2,
    borderColor: "grey",
    margin: 10,
    borderRadius: 7
  },
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
  content_infos:{
    justifyContent: "space-between",
    flexDirection: "row",
    paddingTop:10,
    paddingBottom: 10,
  },
  content_img:{
    height: 150,
    width: "100%",
    flexDirection: "row",
  },
  img:{
    width: "100%",
    height:150,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  user:{
    width: 75,
    height:75,
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
});



    {/* </ScrollView> */}
      {/* <ScrollView horizontal={true}> */}
        {/* <View style={styles.content_img}> 
          {item.photos.map((img, index) => {
          // console.log(img.url);
          return( 
            <Image style={styles.img} source={{ uri:img.url}}/>
          )
          
        })} 
      </View> */}
    {/* </ScrollView> */}


