import * as React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { useState, useEffect } from "react";
import axios from 'axios';

function FlatListScreen() {
  const [data, setData] = useState([]);
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
                  <View> 
                    {item.photos.map((file, index) => {
                      // console.log(file.url);
                      <Image style={styles.img} source={{ uri:file.url }}/>
                    })} 
                  </View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.title}>{item.description}</Text>
                  {/* <Text style={styles.title}>{item.price}</Text> */}
                  <Text style={styles.title}>{item.reviews}</Text>
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
    marginBottom: 20
  },
  img:{
    width: 100,
    height:100
  },
  text: {
    fontSize: 30,
    marginTop: 40,
  },
  title: {
    fontSize: 20,
    marginTop: 40,
    color: "black",
  },
});
