import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Tripmeter from './lib/Tripmeter';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ marginTop: 55 }}>Tripmeter test</Text>
        <Tripmeter initial='750392' tripmeterHeight={150} boxHeight={50} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2089dc',
    flex: 1,
    justifyContent: 'center',
  },
});
