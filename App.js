import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { firebaseAuth } from './utils/firebase';
import Login from './components/login';
import Home from './components/home';

export default class App extends React.Component {
  checkAuth() {
    console.log(firebaseAuth.currentUser)
    if (!firebaseAuth.currentUser) {
      Actions.replace('login');
    }
  }
  render() {
    return (
        <Router screenStyle={styles.container}>
          <Stack key='root'>
            <Scene key='home' component={Home} initial on={this.checkAuth} />
            <Scene key='login' component={Login} init title='Login'/>
          </Stack>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
