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
import { normaliseEmail } from '../utils/auth';
import { colors } from '../utils/styleConsts';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      pass: undefined,
      isFetching: false,
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.focusOnPassInput = this.focusOnPassInput.bind(this);
  }
  async handleLogin() {
    try {
      const { email, pass } = this.state;
      this.setState({isFetching: true});
      await firebaseAuth
          .signInWithEmailAndPassword(normaliseEmail(email), pass);
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

  focusOnPassInput() {
    this.refs.passInput.focus();
  }
  
  render() {
    const { isFetching } = this.state;
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        { isFetching ? <ActivityIndicator size='small' color={colors.baseRed} /> : null }
        <Text style={styles.text}>Email</Text>
        <TextInput 
          autoFocus
          autoCorrect={false}
          keyboardType='email-address'
          onChangeText={(email) => this.setState({ email })} 
          onSubmitEditing={this.focusOnPassInput}
          returnKeyType='next'
          style={styles.input}
          value={this.state.email} 
        />
        <Text style={styles.text}>Password</Text>
        <TextInput 
          onChangeText={(pass) => this.setState({ pass })} 
          onSubmitEditing={this.handleLogin}
          ref='passInput'
          returnKeyType='send'
          secureTextEntry
          style={styles.input}
          value={this.state.pass} 
        />
        <Button title='Log in' color={colors.baseRed} onPress={this.handleLogin} disabled={isFetching} />
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
    backgroundColor: colors.baseOrange,
  },
  text: {
    color: colors.baseWhite,
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    color: colors.baseWhite,
    height: 40,
    marginBottom: 15,
  },
  link: {
    height: 30,
    marginTop: 15,
    color: colors.baseWhite,
    fontSize: 16,
    textDecorationLine: 'underline',
    textAlign: 'center',
  }
});

export default Login;
