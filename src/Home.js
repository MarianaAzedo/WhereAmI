import React, { useState, useEffect, Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

const Home = ({ navigation }) => {
  //Variable to Set Location
  let [location, setLocation] = useState('');
  //Variable to Set Latitude/Longitude
  let [latitude, setLatitude] = useState(null);
  let [longitude, setLongitude] = useState(null);
  const [setErrorMsg] = useState(null);
  //Variable to Set Weather
  let [weather, setWeather] = useState('');
  //Variable to Set Currency
  let [currency, setCurrency] = useState('');
  const iso_code =
    location && location.results[0].annotations.currency.iso_code;
  //Variable currency change
  const rate = currency && currency.rates[Object.keys(currency.rates)[0]];

  //API Location Latitude Longitude.
  useEffect(() => {
    if (latitude && longitude) {
      fetch(
        `https://api.opencagedata.com/geocode/v1/json?key=1c0a60030ffd41fe812391abf261459d&q=${latitude}+${longitude}`,
      )
        .then((response) => response.json())
        .then((json) => setLocation(json));
    }
  }, [latitude, longitude]);

  //API Location Expo.
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  //API Location Weather by Latitude / Longitude.
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=b3f7850706284171c37ef9f6de2f0569
      `,
    )
      .then((response) => response.json())
      .then((json) => setWeather(json));
  }, [latitude, longitude]);

  // API Currency.
  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest?base=USD&symbols=${iso_code}`)
      .then((response) => response.json())
      .then((json) => setCurrency(json));
  }, [iso_code]);

  return (
    <View style={{ backgroundColor: '#212121', minHeight: '100vh' }}>
      <View style={style.container}>
        <Text style={style.text1}>You are here,</Text>
        {/* imput city (in case dublin is a county) */}
        <Text style={style.text2}>
          {location && location.results[0].components.county}
        </Text>
        {/* imput country */}
        <Text style={style.text4}>
          {location && location.results[0].components.country}
          {/* imput weather */}
        </Text>
        <Text style={style.text3}>
          {weather.cod == 200 && parseInt(weather.main.temp) + 'ºC'}
        </Text>
      </View>
      {/* Button to send to page Currency */}
      <Button
        icon="currency-usd-off"
        color="gray"
        mode="contained"
        style={style.button}
        onPress={() =>
          navigation.navigate('Currency', { rate, iso_code, location })
        }
      ></Button>
      {/* Button to send to page timeline */}
      <Button
        icon="chart-timeline-variant"
        color="gray"
        mode="contained"
        style={style.button}
        onPress={() => navigation.navigate('Timeline', { location, weather })}
      ></Button>
    </View>
  );
};

//StyleSheet
const style = StyleSheet.create({
  button: {
    padding: '20px',
    alignItems: 'stretch',
    backgroundColor: '#9CF0FF',
    marginTop: 10,
    bottom: 0,
  },
  text1: {
    justifyContent: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    paddingTop: 70,
    paddingBottom: 50,
    textAlign: 'center',
    color: '#E0E0E0',
  },
  text2: {
    justifyContent: 'center',
    fontFamily: 'Lato-Bold',
    paddingTop: 30,
    fontSize: 40,
    textAlign: 'center',
    color: '#9CF0FF',
  },
  text3: {
    justifyContent: 'center',
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    paddingBottom: 70,
    textAlign: 'center',
    color: '#E0E0E0',
  },
  text4: {
    justifyContent: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    paddingBottom: 30,
    textAlign: 'center',
    color: '#E0E0E0',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
    justifyContent: 'center',
  },
});

export default Home;
