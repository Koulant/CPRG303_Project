// Hourly.js

import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, FlatList } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';
import { API_KEY } from './Constants';

const Hourly = ({ route }) => {
  const { name } = route.params;
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    fetchHourlyData();
  }, []);

  const fetchHourlyData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.list && res.list.length > 0) {
          setHourlyData(res.list);
        }
      })
      .catch((err) => console.log(err));
  };

  const HourlyItem = ({ item }) => (
    <View>
      <Text style={{ color: 'white', fontSize: 24 }}>
        {(item.main.temp - 273).toFixed(2)}&deg; C
      </Text>
      <Text style={{ color: 'white', fontSize: 22, marginBottom: 16 }}>
        Feels Like: {(item.main.feels_like - 273).toFixed(2)}&deg; C
      </Text>
      {/* Add more details as needed */}
    </View>
  );

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image3.jpg')}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
      >
      <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
        Hourly Weather Details for {name}
      </Text>

      <FlatList
        data={hourlyData}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => <HourlyItem item={item} />}
      />
      </ImageBackground>
    </View>
  );
};

export default Hourly;
