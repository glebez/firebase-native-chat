import React from 'react';
import {
  TextInput,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { firebaseDB, firebaseAuth } from '../utils/firebase';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: undefined,
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.wrapper = KeyboardAvoidingView;
    this.wrapperProps = {
        behavior: 'padding',
        style: styles.container,
        keyboardVerticalOffset: 60,
    };
  }

  componentWillMount() {
    this.dbMessages = firebaseDB.ref('messages');
    this.dbMessages.on('value', snapshot => this.setState({messages: snapshot.val()}));
  }

  componentWillUnmount() {
    this.dbMessages.off();
  }

  renderMessages() {
    const { messages } = this.state;
    if (!messages) {
      return <Text>There are no messages yet</Text>;
    }
    return Object.keys(messages).sort().map((item, i) => <Text key={item + i}>{messages[item].user}: {messages[item].message}</Text>);
  }

  sendMessage() {
    firebaseDB.ref('messages/' + Date.now()).set({
      user: firebaseAuth.currentUser.displayName,
      message: this.state.newMessage,
    });
  }

  render() {
    const Wrapper = this.wrapper;
    return (
      <Wrapper {...this.wrapperProps} >
        <ScrollView contentContainerStyle={styles.messages}>
          {this.renderMessages()}
        </ScrollView>
        <View style={styles.inputWrap}>
          <TextInput
            value={this.state.newMessage}
            onChangeText={newMessage => this.setState({newMessage})}
            onSubmitEditing={this.sendMessage}
            style={styles.input}
          />
          <TouchableHighlight style={styles.sendBtn} onPress={this.sendMessage}>
            <Text>Send</Text>
          </TouchableHighlight>
        </View>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messages: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
  inputWrap: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
  },
  sendBtn: {
    backgroundColor: 'tomato',
    width: 50,
  },
});
export default Chat;
