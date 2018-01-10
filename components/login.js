import React from 'react';
import { View, StyleSheet, Button, TextInput, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { firebaseAuth } from '../utils/firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: undefined,
      pass: undefined,
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
  async handleLogin() {
    try {
      const { login, pass } = this.state;
        await firebaseAuth
            .signInWithEmailAndPassword(login, pass);
        console.log('Logged In!');
        Actions.replace('home');
    } catch (error) {
        console.log(error.toString())
    }
  }
  render() {
    return (
      <View>
        <Text>Login</Text>
        <TextInput 
          onChangeText={(login) => this.setState({ login })} 
          value={this.state.login} 
        />
        <Text>Password</Text>
        <TextInput 
          onChangeText={(pass) => this.setState({ pass })} 
          value={this.state.pass} 
        />
        <Button title='Login' onPress={this.handleLogin} />
      </View>
    );
  }
}

export default Login;
