import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Button, TextInput, Text } from 'react-native';
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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <TextInput 
          onChangeText={(login) => this.setState({ login })} 
          value={this.state.login} 
          style={styles.input}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput 
          onChangeText={(pass) => this.setState({ pass })} 
          value={this.state.pass} 
          style={styles.input}
          secureTextEntry
        />
        <Button title='Login' color="#ff342d" onPress={this.handleLogin} />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 25,
    backgroundColor: '#ff9d2d',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    color: '#fff',
    height: 40,
    marginBottom: 15,
  }
});

export default Login;
