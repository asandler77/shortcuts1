import React from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

export default ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TextInput>DetailsScreen</TextInput>
        <Button
            title={'Go to About'}
            onPress={() => {
                navigation.navigate('About');
            }}
        />
      <Button
        title={'Go Home'}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
