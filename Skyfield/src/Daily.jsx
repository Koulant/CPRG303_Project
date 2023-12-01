import React, {useEffect, useState} from 'react';
import {View, Text, ImageBackground, ScrollView, Image} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {deviceHeight, deviceWidth} from './Dimensions';
import {API_KEY} from './Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const Daily = ({route}) => {
  const {name} = route.params;
  const [dailyData, setDailyData] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchDailyData();
  }, []);

  const fetchDailyData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${name}&cnt=40&appid=${API_KEY}`,
    )
      .then(res => res.json())
      .then(res => {
        if (res.list && res.list.length > 0) {
          const now = new Date();
          now.setHours(12, 0, 0, 0);

          const nextFiveDaysData = res.list.filter(item => {
            const date = new Date(item.dt * 1000);
            return date.getTime() !== now.getTime();
          });

          const groupedData = nextFiveDaysData.reduce((acc, item) => {
            const date = new Date(item.dt * 1000);
            const day = date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            });
            if (!acc[day]) {
              acc[day] = [];
            }
            acc[day].push(item);
            return acc;
          }, {});

          const result = Object.keys(groupedData).map(day => {
            return {
              day: day,
              times: groupedData[day],
            };
          });

          setDailyData(result);
        }
      });
  };

  const handleDayChange = (itemValue, itemIndex) => {
    setSelectedDay(itemValue);
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/image4.jpg')}
        style={{
          height: deviceHeight,
          width: deviceWidth,
          flex: 1,
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
          Daily Weather for {name} on {selectedDay}
        </Text>

        <View
          style={{
            marginHorizontal: 10,
            marginBottom: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Picker
            selectedValue={selectedDay}
            onValueChange={(itemValue, itemIndex) =>
              handleDayChange(itemValue, itemIndex)
            }
            style={{
              width: deviceWidth * 0.9,
              borderColor: 'white',
              borderRadius: 20,
              backgroundColor: '#555555',
              color: 'white',
            }}>
            {dailyData.map((day, index) => (
              <Picker.Item key={index} label={day.day} value={day.day} />
            ))}
          </Picker>
        </View>

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
          <ScrollView>
            {dailyData.map((day, index) => {
              if (day.day === selectedDay) {
                return day.times.map((item, index) => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      padding: 5,
                    }}
                    key={index}>
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
                ));
              }
            })}
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Daily;
