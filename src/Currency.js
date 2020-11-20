import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';

const Currency = ({ route, navigation }) => {
  let iso_code = route.params.iso_code; //Variable to get currency location
  let location = route.params.location; //Variable to get location
  let rate = route.params.rate; //Variable to get the rate
  let [localCurrency, setLocalCurrency] = useState('');
  //USD currency
  let [usd, setUsd] = useState('');

  return (
    // calculator to get value USD to the currency in the local place.
    <View style={style.container}>
      <Text style={style.text3}>Currency</Text>
      <label>
        {/* label to show the result in the currency USD.  */}
        USD {''}
        <TextInput
          onChangeText={(amount) => setLocalCurrency(amount * rate)}
          style={{
            borderWidth: 1,
            width: 100,
            heigth: 30,
            borderColor: '#9CF0FF',
            backgroundColor: '#C8F5FD',
            fontFamily: 'Lato-Bold',
            fontSize: 20,
          }}
        />
      </label>
      {/* calculator to get value currency in the local place to USD. */}
      <Text style={style.text1}>
        {/* Function to type the value and show symbol currency location */}
        {localCurrency &&
          localCurrency.toFixed(2) +
            location.results[0].annotations.currency.symbol}{' '}
      </Text>
      <label>
        {' '}
        {/* label to show the result in the currency location. */}
        {iso_code}
        {/* Function to show the result in + symbol currency location */}
        <TextInput
          onChangeText={(amount) => setUsd(amount / rate)}
          style={{
            borderWidth: 1,
            width: 100,
            heigth: 30,
            borderColor: '#9CF0FF',
            backgroundColor: '#C8F5FD',
            fontFamily: 'Lato-Bold',
            fontSize: 20,
          }}
        />
      </label>{' '}
      {/* label to show the result in dolar. */}
      <Text style={style.text1}>{usd && usd.toFixed(2) + '$'}</Text>
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
  text3: {
    flex: 1,
    backgroundColor: '#212121',
    fontFamily: 'Lato-Bold',
    fontSize: 30,
    textAlign: 'center',
    color: '#E0E0E0',
    paddingBottom: 100,
    paddingTop: 70,
  },
  text1: {
    fontFamily: 'Lato-Bold',
    fontSize: 20,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#E0E0E0',
    paddingBottom: 20,
    paddingTop: 10,
  },
  container: {
    flex: 2,
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Lato-Regular',
    fontSize: 20,
    color: '#E0E0E0',
  },
  button: {
    flex: 3,
    backgroundColor: '#212121',
    padding: '20px',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
});

export default Currency;
