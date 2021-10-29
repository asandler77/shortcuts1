import React from 'react';
import {StyleSheet, Text, SafeAreaView, Button} from 'react-native';

interface Props {
  name: string;
}
export default ({navigation}: any) => {
  const [count, setCount] = React.useState(0);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" color={'white'} />
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Count: {count}</Text>
      <Text>Home 1 </Text>
      <Button
        title={'Go to Details'}
        onPress={() => navigation.navigate('Details')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

