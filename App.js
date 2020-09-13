import React from 'react';
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";

const API_KEY =  "94ffc790dc95425e21b02840b0e89806";

export default class extends React.Component{
  state = {
    isLoading: true
  };
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: {latituede, longitude}
      } = await Location.getCurrentPositionAsync();
      this.setState({isLoading: false});
      console.log(coords.latitude, coords.longitude);
    } catch (error) {
      Alert.alert("Can't find you.","so sad");
    }   
  };
  componentDidMount(){
    this.getLocation();
  }
  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}