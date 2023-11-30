import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text, FlatList, Image } from 'react-native';
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
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
      <Text style={{ color: 'white', fontSize: 18 }}>
        {new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
      </Text>
      <Image
        source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
        style={{ width: 50, height: 50 }}
      />
      <Text style={{ color: 'white', fontSize: 18 }}>
        {(item.main.temp - 273).toFixed(2)}&deg; C
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
        <Text style={{ color: 'white', fontSize: 40, textAlign: 'center', padding: 10 }}>
          Hourly Weather for {name}
        </Text>

        <FlatList
          data={hourlyData}
          keyExtractor={(item) => item.dt.toString()}
          renderItem={({ item }) => <HourlyItem item={item} />}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </ImageBackground>
    </View>
  );
};

export default Hourly;
