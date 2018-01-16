import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Button,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { firebaseAuth } from '../utils/firebase';
import { normaliseEmail } from '../utils/auth';
import { colors } from '../utils/styleConsts';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      pass: undefined,
      confirmPass: undefined,
      username: undefined,
      isFetching: false,
    }
    this.handleSignup = this.handleSignup.bind(this);
  }
  async handleSignup() {
    try {
      const { email, pass, confirmPass, username } = this.state;
      if (pass !== confirmPass) {
        throw 'Passwords do not match';
      }
      this.setState({isFetching: true });
      const user = await firebaseAuth
        .createUserWithEmailAndPassword(normaliseEmail(email), pass);
      await user.updateProfile({displayName: username });
      Actions.replace('home');
    } catch (error) {
        this.setState({isFetching: false});
        console.log(error.toString())
    }
  }
  render() {
    const { isFetching } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} keyboardVerticalOffset={60}>
        <ScrollView contentContainerStyle={styles.innerWrap} >
          { isFetching ? <ActivityIndicator size="small" color={colors.baseRed} /> : null }
          <Text style={styles.text}>Email</Text>
          <TextInput 
            onChangeText={(email) => this.setState({ email })} 
            value={this.state.email} 
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
          <Button title='Sign Up' color={colors.baseRed} onPress={this.handleSignup} disabled={isFetching} />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerWrap: {
    flexGrow: 1,
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
  }
});

export default Signup;
