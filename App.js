import React from 'react';
import { Alert } from "react-native";
import Loading from "./Loading";
import Weather from "./Weather";
import * as Location from "expo-location";
import axios from "axios";
const API_KEY =  "94ffc790dc95425e21b02840b0e89806";

export default class extends React.Component{
  state = {
    isLoading: true

  };
  getWeather = async(latitude, longitude) => {
    
    const { data } = await axios. get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    console.log(data);
    this.setState({isLoading:false, condition:"clear", temp: data.main.temp});
    
  }
  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const {
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
    } catch (error) {
      console.log(error);
      Alert.alert("Can't find you.","so sad");
    }   
  };
  componentDidMount(){
    this.getLocation();
  }
  render() {
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>;
  }
}
