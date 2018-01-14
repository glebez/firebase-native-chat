import React from 'react';
import { KeyboardAvoidingView,
  StyleSheet,
  Button,
  TextInput,
  Text,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { firebaseAuth } from '../utils/firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: undefined,
      pass: undefined,
      isFetching: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
  }
  async handleLogin() {
    try {
      const { login, pass } = this.state;
      const cleanLogin = login && login.toLowerCase().trim();
      this.setState({isFetching: true});
      await firebaseAuth
          .signInWithEmailAndPassword(cleanLogin, pass);
      console.log('Logged In!');
      Actions.replace('home');
    } catch (error) {
      this.setState({isFetching: false});
        console.log(error.toString())
    }
  }
  handleSignupPress() {
    Actions.signup();
  }
  render() {
    const { isFetching } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        { isFetching ? <ActivityIndicator size="small" color="#ff342d" /> : null }
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
        <Button title='Login' color="#ff342d" onPress={this.handleLogin} disabled={isFetching} />
        <TouchableHighlight onPress={this.handleSignupPress}>
          <Text style={styles.link} >I want to sign up</Text>
        </TouchableHighlight>
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
  },
  link: {
    height: 30,
    marginTop: 15,
    color: '#fff',
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  }
});

export default Login;
