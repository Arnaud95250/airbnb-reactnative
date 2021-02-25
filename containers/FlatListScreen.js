import * as React from "react";
import { View, Text, FlatList, StyleSheet, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import axios from 'axios';
// import { ScrollView } from "react-native-gesture-handler";

function FlatListScreen() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
      <Text style={styles.text}>FlatList Screen</Text>
      {isLoading ? (
          <Text>En cours de chargement... </Text>
      ) : (
        <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.container}>
                  <ScrollView horizontal={true}>
                    <View style={styles.content_img}> 
                      {item.photos.map((img, index) => {
                        // console.log(img.url);
                        return( 
                          <Image style={styles.img} source={{ uri:img.url}}/>
                        )
                        
                      })} 
                    </View>
                  </ScrollView>
                  <View style={{flexDirection: "row"}}>
                    <View style={{width: "70%"}}>
                        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                        <Text style={styles.title}>{item.reviews}</Text>
                    </View>
                    <View>
                        <Image style={styles.user} source={{ uri:item.user.account.photo.url }}/>
                    </View>
                  </View>
                  
                  {/* <Text style={styles.title}>{item.description}</Text> */}
                  {/* <Text style={styles.title}>{item.price}</Text> */}
                </View>
              )
            }}
            keyExtractor={(item) => item._id}
          >
        </FlatList>
      )}
    </View>
  );
}
export default FlatListScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
    // marginBottom: 20,
    padding:10,
    margin: 10,
    borderRadius: 10
  },
  content_img:{
    // backgroundColor:"pink",
    height: 150,
    width: "100%",
    flexDirection: "row"
  },
  img:{
    width: 310,
    height:150,
    marginRight: 10,
    borderRadius:10
  },
  user:{
    width: 75,
    height:75,
    borderRadius: 100
  },
  text: {
    fontSize: 30,
    marginTop: 40,
  },
  title: {
    // width: "80%",
    fontSize: 20,
    marginTop: 40,
    color: "black",
    overflow: "hidden",
    
  },
});
