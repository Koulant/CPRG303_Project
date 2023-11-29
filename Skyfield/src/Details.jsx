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
            <Icon name="menu" size={46} color="white" />
            <Image
              source={require('../assets/images/user.jpg')}
              style={{ height: 46, width: 46, borderRadius: 50 }}
            />
          </View>

          {data ? (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: deviceHeight - 100,
              }}
            >
              <View>
                <Text style={{ color: 'white', fontSize: 40 }}>{name}</Text>
                <Text style={{ fontSize: 22, color: 'white', textAlign: 'center' }}>
                  {data['weather'][0]['main']}
                </Text>
              </View>

              <Text style={{ color: 'white', fontSize: 64 }}>
                {(data['main']['temp'] - 273).toFixed(2)}&deg; C
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

              <View>
                <Text style={{ color: 'white', fontSize: 22, marginBottom: 16 }}>
                  Weather Details
                </Text>
                <View style={{ width: deviceWidth - 60 }}>
                  <Data value={data['wind']['speed']} title="Wind" />
                  <Data value={data['main']['pressure']} title="Pressure" />
                  <Data value={`${data['main']['humidity']}%`} title="Humidity" />
                  <Data value={data['visibility']} title="Visibility" />
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </View>
  );
}
