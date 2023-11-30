import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { deviceHeight, deviceWidth } from './Dimensions';
import { API_KEY } from './Constants';

export default function Details(props) {
const [data, setData] = useState();
const { name } = props.route.params;
const navigation = useNavigation();

useEffect(() => {
    fetchWeatherData();
}, []);

const fetchWeatherData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`)
    .then((res) => res.json())
    .then((res) => setData(res))
    .catch((err) => console.log(err));
};

const Data = ({ title, value }) => (
    <View
    style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }}
    >
    <Text style={{ color: 'gray', fontSize: 22 }}>{title}</Text>
    <Text style={{ color: 'white', fontSize: 22 }}>{value}</Text>
    </View>
);

const navigateToHourlyPage = () => {
    navigation.navigate('Hourly', { name });
};

const navigateToDailyPage = () => {
    navigation.navigate('Daily', { name });
};

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image1.jpg')}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
      >
        <View
          style={{
            position: 'absolute',
            paddingVertical: 20,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: deviceWidth - 20,
            }}
          >
          </View>

          {data ? (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: deviceHeight - 200,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 55 }}>{name}</Text>
              </View>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {data.weather && data.weather[0].icon && (
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
                    }}
                    style={{ width: 200, height: 200, marginLeft: 10 }}
                  />
                )}
              </View>

              <Text style={{ fontSize: 25, color: 'white', textAlign: 'center' }}>
                {data['weather'][0]['main']}
              </Text>

              <Text style={{ color: 'white', fontSize: 55 }}>
                {(data['main']['temp'] - 273).toFixed(2) + '°C'}
              </Text>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity
                  onPress={navigateToHourlyPage}
                  style={{
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 5,
                    marginRight: 10, // Add margin for spacing between buttons
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Hourly Forecast</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={navigateToDailyPage}
                  style={{
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 16 }}>Daily Forecast</Text>
                </TouchableOpacity>
              </View>

              <View style={{ width: deviceWidth - 60, marginTop: 10 }}>
                <Data value={(data['main']['feels_like'] - 273).toFixed(2) + '°C'} title="Feels Like" />
                <Data value={`${data['wind']['speed']} m/s`} title="Wind Speed" />
                <Data value={data['main']['pressure']} title="Pressure" />
                <Data value={`${data['main']['humidity']}%`} title="Humidity" />
                <Data value={data['main']['uvi']} title="UV Index" />
                <Data value={`${data['visibility']} meters`} title="Visibility" />
            </View>

            </View>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}