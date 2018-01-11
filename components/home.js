import React from 'react';
import { View, Text } from 'react-native';
import { firebaseAuth } from '../utils/firebase';

class Home extends React.Component {
  render() {
    return <View>
        <Text>Yo, you're home, {firebaseAuth.currentUser.displayName}</Text>
      </View>
  }
}

export default Home;
