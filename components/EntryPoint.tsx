import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Settings from './Settings';
import {
  Button,
  DeviceEventEmitter,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import QuickActions from 'react-native-quick-actions';

/*
https://navdeeplink.page.link/test
The link above configured on firebase console for current project under alexeysh77 gmail user. In order to edit the screen go to:
https://console.firebase.google.com/ open NavDeepLink project,
on side menu bar go to Dynamic Links.
Click on hidden 3 dots fot edit menu.
In opened window click on Next, in the next window edit the url as you need https://mychat/settings...
https://navdeeplink.page.link/test

The screencasts on the next url: https://rnfirebase.io/screencasts/

 */

// npx uri-scheme open mychat://settings --ios

const config = {
  screens: {
    // Home: {
    //   screens: {
    //     Home: 'home',
    //     Details: 'details',
    //   },
    // },
    Home: 'home',
    Settings: 'settings',
  },
};

const linking = {
  prefixes: ['mychat://', 'https://mychat'],
  config,
};

const Settings1 = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TextInput>DetailsScreen</TextInput>
      <Button
        title={'Go Home'}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
    </View>
  );
};

const Home1 = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TextInput>Home</TextInput>
      <Button
        title={'Go to settings'}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </View>
  );
};

const Tab = createStackNavigator();

const navigationRef = React.createRef<any>();

const navigateObject = (name: string, params: any) => {
  console.log('in navigateObject...1 ', name);

  navigationRef.current && navigationRef.current?.navigate(name, params);
};

const navigateToSettings = () => {
  navigateObject('Settings', {});
};

DeviceEventEmitter.addListener('quickActionShortcut', data => {
  console.log('kukareku');
  console.log(data.title);
  console.log(data.type);
  console.log(data.userInfo);
});

const doSomethingWithTheAction = (data: any) => {
  console.log(data?.title);
  console.log(data?.type);
  console.log('userInfo', data?.userInfo);
  if (data?.userInfo.url === 'mychat://settings') {
    navigateToSettings();
  }
};

QuickActions.popInitialAction()
  .then(doSomethingWithTheAction)
  .catch(console.error);

QuickActions.setShortcutItems([
  {
    type: 'Orders', // Required
    title: 'Go to settings', // Optional, if empty, `type` will be used instead
    subtitle: "See orders you've made",
    icon: 'Compose', // Icons instructions below
    userInfo: {
      url: 'mychat://settings', // Provide any custom data like deep linking URL
    },
  },
]);

export const EntryPoint = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      // linking={linking}
      fallback={<Text>Loading...</Text>}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home1} />
        <Tab.Screen name="Settings" component={Settings1} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
