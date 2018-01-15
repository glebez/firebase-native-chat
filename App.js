import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Scene, Stack, Actions } from 'react-native-router-flux';
import { firebaseAuth } from './utils/firebase';
import Login from './components/login';
import Signup from './components/signup';
import Chat from './components/chat';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = [
      'Setting a timer',
    ];
  }

  checkAuth() {
    if (!firebaseAuth.currentUser) {
      Actions.replace('login');
    }
  }
  render() {
    return (
        <Router screenStyle={styles.container}>
          <Stack key='root'>
            <Scene key='home' component={Chat} initial on={this.checkAuth} />
            <Scene key='login' component={Login} init title='Login'/>
            <Scene key='signup' component={Signup} title='Signup'/>
          </Stack>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
