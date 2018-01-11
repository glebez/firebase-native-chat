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
      confirmPass: undefined,
      username: undefined,
    }
    this.handleSignup = this.handleSignup.bind(this);
  }
  async handleSignup() {
    try {
      const { login, pass, confirmPass, username } = this.state;
      if (pass !== confirmPass) {
        throw 'Passwords do not match';
      }
      const user = await firebaseAuth
        .createUserWithEmailAndPassword(login, pass);
      await user.updateProfile({displayName: username });
      Actions.replace('home');
    } catch (error) {
        console.log(error.toString())
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>Email</Text>
        <TextInput 
          onChangeText={(login) => this.setState({ login })} 
          value={this.state.login} 
          style={styles.input}
        />
        <Text style={styles.text}>Username</Text>
        <TextInput 
          onChangeText={(username) => this.setState({ username })} 
          value={this.state.username} 
          style={styles.input}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput 
          onChangeText={(pass) => this.setState({ pass })} 
          value={this.state.pass} 
          style={styles.input}
          secureTextEntry
        />
        <Text style={styles.text}>Confirm Password</Text>
        <TextInput 
          onChangeText={(confirmPass) => this.setState({ confirmPass })} 
          value={this.state.confirmPass} 
          style={styles.input}
          secureTextEntry
        />
        <Button title='Sign Up' color="#ff342d" onPress={this.handleSignup} />
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
