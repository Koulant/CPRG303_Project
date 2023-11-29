import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, FlatList } from 'react-native';
import { deviceHeight, deviceWidth } from './Dimensions';
import { API_KEY } from './Constants';

const Daily = ({ route }) => {
  const { name } = route.params;
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    fetchDailyData();
  }, []);

  const fetchDailyData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.daily && res.daily.length > 0) {
          // Assuming the API response contains daily data in res.daily
          setDailyData(res.daily.slice(0, 8)); // Displaying data for the next 8 days
        }
      })
      .catch((err) => console.log(err));
  };

  const DailyItem = ({ item }) => (
    <View>
      <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
        {new Date(item.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Text>
      <Text style={{ color: 'white', fontSize: 64 }}>
        {(item.temp.day - 273).toFixed(2)}&deg; C
      </Text>
      <Text style={{ color: 'white', fontSize: 22, marginBottom: 16 }}>
        Feels Like: {(item.feels_like.day - 273).toFixed(2)}&deg; C
      </Text>
      <Text style={{ color: 'white', fontSize: 16 }}>
        {item.weather[0].description}
      </Text>
      {/* Add more details as needed */}
    </View>
  );

  return (
    <View>
      <ImageBackground
        source={require('../assets/images/image4.jpg')}
        style={{ height: deviceHeight, width: deviceWidth }}
        imageStyle={{ opacity: 0.6, backgroundColor: 'black' }}
      >
      <Text style={{ color: 'white', fontSize: 24, textAlign: 'center' }}>
        Daily Weather Forecast for {name}
      </Text>

      <FlatList
        data={dailyData}
        keyExtractor={(item) => item.dt.toString()}
        renderItem={({ item }) => <DailyItem item={item} />}
      />
      </ImageBackground>
    </View>
  );
};

export default Daily;
