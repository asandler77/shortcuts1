import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import DetailsScreen from './DetailsScreen';
import Settings from './Settings';
import About from './About';
import {DeviceEventEmitter, Text} from 'react-native';
import QuickActions from "react-native-quick-actions";



/*
https://navdeeplink.page.link/test
The link above configured on firebase console for current project under alexeysh77 gmail user. In order to edit the screen go to:
https://console.firebase.google.com/ open NavDeepLink project,
on side menu bar go to Dynamic Links.
Click on hidden 3 dots fot edit menu.
In opened window click on Next, in the next window edit the url as you need https://mychat/settings...
https://navdeeplink.page.link/test

The screencasts on the next url: https://rnfirebase.io/screencasts/

    // npx uri-scheme open mychat://settings --android


 */

DeviceEventEmitter.addListener('quickActionShortcut', data => {
  console.log(data.title);
  console.log(data.type);
  console.log(data.userInfo);
});


DeviceEventEmitter.addListener("quickActionShortcut", data => {
  console.log(data.title);
  console.log(data.type);
  console.log(data.userInfo);
});

function doSomethingWithTheAction(data: any) {
  console.log(data.title);
  console.log(data.type);
  console.log(data.userInfo);
}


QuickActions.setShortcutItems([
  {
    type: "Orders", // Required
    title: "Go to settings", // Optional, if empty, `type` will be used instead
    subtitle: "See orders you've made",
    icon: "Compose", // Icons instructions below
    userInfo: {
      url: "mychat://settings" // Provide any custom data like deep linking URL
    }
  }
]);





const config = {
  screens: {
    Home: {
      screens: {
        Home: 'home',
        Details: 'details',
      },
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
  prefixes: [ 'mychat://', 'https://mychat'],
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
  console.log('SettingsStackScreen innnnnnn')
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="About" component={About} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const EntryPoint = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
