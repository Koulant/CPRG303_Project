import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Text, FlatList, Image} from 'react-native';
import {deviceHeight, deviceWidth} from './Dimensions';
import {API_KEY} from './Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Hourly = ({route}) => {
  const {name} = route.params;
  const [hourlyData, setHourlyData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHourlyData();
  }, []);

  const fetchHourlyData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => {
        if (res.list && res.list.length > 0) {
          setHourlyData(res.list);
        }
      })
      .catch(err => console.log(err));
  };

  const HourlyItem = ({item}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          marginHorizontal: 10,
          marginTop: 12,
        }}>
        {new Date(item.dt * 1000).toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        })}
      </Text>
      <Image
        source={{
          uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
        }}
        style={{width: 55, height: 55, marginHorizontal: 10}}
      />
      <Text
        style={{
          color: 'white',
          fontSize: 24,
          marginHorizontal: 10,
          marginTop: 12,
        }}>
        {(item.main.temp - 273).toFixed(2)}&deg; C
      </Text>
      {/* Add more details as needed */}
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/image6.jpg')}
        style={{
          height: deviceHeight,
          width: deviceWidth,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
        }}
        imageStyle={{opacity: 0.6, backgroundColor: 'black'}}>
        <View
          style={{
            position: 'absolute',
            top: 20,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Icon
            name="arrow-back"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>

        <Text
          style={{
            color: 'white',
            fontSize: 40,
            textAlign: 'center',
            padding: 0,
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: {width: 2, height: 2},
            textShadowRadius: 5,
            fontWeight: 'bold',
            marginTop: 50,
          }}>
          Hourly Weather for {name}
        </Text>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: 20,
            width: deviceWidth * 0.9,
            alignSelf: 'center',
          }}>
          <FlatList
            data={hourlyData}
            keyExtractor={item => item.dt.toString()}
            renderItem={({item}) => <HourlyItem item={item} />}
            contentContainerStyle={{paddingVertical: 0}}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Hourly;
