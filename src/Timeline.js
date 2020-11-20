import React from 'react';
import { List, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timeline = ({ route, navigation }) => {
  const location = route.params.location; //Variable to get location
  const weather = route.params.weather; //Variable to get weather

  // new Variable to SAVE location and Weather
  const city = location.results[0].components.county;
  const temp = weather.main.temp;
  const [mycities, setCities] = React.useState(false);

  const Save = async () => {
    // Function to SAVE my weater and location
    try {
      let values = {
        city: city,
        temp: temp,
      };
      await AsyncStorage.setItem('values', JSON.stringify(values));
      let cities = JSON.parse(await AsyncStorage.getItem('cities')) || [];
      cities.push(values);
      await AsyncStorage.setItem('cities', JSON.stringify(cities));
      showStored();
    } catch (e) {
      console.log(e);
    }
  };
  // Function to show the location(cities) saved.
  const showStored = async () => {
    let locations =
      (await AsyncStorage.getItem('cities')) &&
      JSON.parse(await AsyncStorage.getItem('cities'));
    setCities(locations);
  };
  React.useEffect(() => {
    showStored();
  }, []);

  return (
    <View style={style.container}>
      {/* button to save the location I am. */}
      <Button
        icon="map-marker-plus"
        color="#212121"
        style={style.button2}
        onPress={Save}
      ></Button>
      {/* Function to create a list the locations saved. */}
      {mycities &&
        mycities.map((item, index) => (
          <List.Item
            title={item.city}
            description={item.temp}
            style={style.item}
            left={(props) => (
              <List.Icon {...props} icon="map-marker" color="#222222" />
            )}
          />
        ))}
      {/* button to go back to homepage. */}
      <Button
        icon="arrow-left"
        color="#9CF0FF"
        style={style.button}
        onPress={() => navigation.navigate('Home')}
      ></Button>
    </View>
  );
};

//StyleSheet
const style = StyleSheet.create({
  item: {
    backgroundColor: '#f2f2f2',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: '#212121',
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    backgroundColor: '#212121',
    padding: '20px',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  button2: {
    padding: '20px',
    alignItems: 'stretch',
    backgroundColor: '#9CF0FF',
  },
});

export default Timeline;
