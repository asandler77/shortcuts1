import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import DetailsScreen from './DetailsScreen';
import Settings from './Settings';
import About from './About';
import {Text} from 'react-native';
import {useEffect} from "react";
import dynamicLinks from '@react-native-firebase/dynamic-links';



    // npx uri-scheme open mychat://home --ios
    // npx uri-scheme open mychat://about --ios
    //   npx uri-scheme open mychat://details --ios
    //   npx uri-scheme open mychat://settings --ios


const config = {
  screens: {
    Home: {
      screens:{
        Home: 'home',
        Details: 'details'
      }
    },
    Settings: {
      screens: {
        Settings: 'settings',
        About: 'about',
      },
    },
  },
};

const linking = {
  prefixes: ['https://mychat', 'mychat://'],
  config,
};

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="About" component={About} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const EntryPoint = ({navigation}) => {
  useEffect(() => {
    dynamicLinks()
        .getInitialLink()
        .then(link => {
          console.log('liiiiiiiink', link)
          if (link.url === 'https://mychat/about') {
            goToAbout();
          }
        });
  }, []);

  const goToAbout=()=>{
    console.log('in aboutttttttttt')
    navigation.navigate('Details');
  }
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


