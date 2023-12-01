import React, {useEffect, useState} from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {deviceHeight, deviceWidth} from './Dimensions';
import {API_KEY} from './Constants';

export default function Details(props) {
  const [data, setData] = useState(null);
  const {name} = props.route.params;
  const navigation = useNavigation();

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`,
    )
      .then(res => res.json())
      .then(res => {
        if (res.weather && res.weather.length > 0) {
          const iconCode = res.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
          setData({...res, iconUrl});
        }
      })
      .catch(err => console.log(err));
  };

  const Data = ({title, value}) => (
    <View style={styles.dataRow}>
      <Text style={styles.dataTitle}>{title}</Text>
      <Text style={styles.dataValue}>{value}</Text>
    </View>
  );

  const navigateToHourlyPage = () => {
    navigation.navigate('Hourly', {name});
  };

  const navigateToDailyPage = () => {
    navigation.navigate('Daily', {name});
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/image1.jpg')}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle}>
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={30}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </View>

        {data ? (
          <View style={styles.mainContent}>
            <Text style={styles.location}>{name}</Text>
            <Image
              source={{uri: data.iconUrl}} // Dynamically set the source of the weather icon
              style={styles.weatherIcon}
            />
            <Text style={styles.temperature}>
              {data.main.temp.toFixed(0)}°C
            </Text>
            <View style={styles.highLowContainer}>
              <Text style={styles.highLowText}>
                High: {data.main.temp_max.toFixed(0)}°C
              </Text>
              <Text style={styles.highLowText}>
                Low: {data.main.temp_min.toFixed(0)}°C
              </Text>
            </View>

            <View style={styles.forecastButtons}>
              <TouchableOpacity
                onPress={navigateToHourlyPage}
                style={styles.forecastButton}>
                <Text style={styles.forecastButtonText}>Hourly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={navigateToDailyPage}
                style={styles.forecastButton}>
                <Text style={styles.forecastButtonText}>Daily</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.detailsList}>
              <Text style={styles.detailsTitle}>Weather Details</Text>
              <Data title="Feels Like" value={`${data.main.feels_like}°C`} />
              <Data title="Wind" value={`${data.wind.speed} m/s`} />
              <Data title="Pressure" value={`${data.main.pressure} hPa`} />
              <Data title="Humidity" value={`${data.main.humidity}%`} />
              <Data
                title="Visibility"
                value={`${(data.visibility / 1000).toFixed(2)} km`}
              />
            </View>
          </View>
        ) : null}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    opacity: 0.6,
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  location: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 5,
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
  },
  mainContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    width: deviceWidth * 0.9,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  temperature: {
    fontSize: 64,
    color: 'white',
    fontWeight: 'bold',
  },
  highLowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  highLowText: {
    fontSize: 24,
    color: 'white',
    marginVertical: 4,
  },
  forecastButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  forecastButton: {
    backgroundColor: '#555555',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  forecastButtonText: {
    color: 'white',
    fontSize: 16,
  },
  detailsList: {
    width: '100%',
    marginTop: 20,
  },
  detailsTitle: {
    fontSize: 22,
    color: 'white',
    marginBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  dataTitle: {
    color: 'gray',
    fontSize: 22,
  },
  dataValue: {
    color: 'white',
    fontSize: 22,
  },
});
