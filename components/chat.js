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
import randomColor from 'randomcolor';
import { firebaseDB, firebaseAuth } from '../utils/firebase';
import { colors } from '../utils/styleConsts';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: undefined,
      userColors: {},
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessagesContentSizeChange = this.handleMessagesContentSizeChange.bind(this);
    this.handleDBDataChange = this.handleDBDataChange.bind(this);
    this.wrapper = KeyboardAvoidingView;
    this.wrapperProps = {
        behavior: 'padding',
        style: styles.container,
        keyboardVerticalOffset: 60,
    };
  }

  componentWillMount() {
    this.dbMessages = firebaseDB.ref('messages');
    this.dbMessages.on('value', this.handleDBDataChange);
  }

  componentWillUnmount() {
    this.dbMessages.off();
  }
  
  handleDBDataChange(snapshot) {
    const messages = snapshot.val();
    // TODO: move user colors to backend to speed things up and persist colors on reload
    const users = Object.keys(messages).reduce((result, cur) => result.indexOf(messages[cur].user) < 0 ? [...result, messages[cur].user] : result, []);
    const userColors = users.reduce((result, cur) => {
      const color = this.state.userColors[cur] || randomColor({luminosity: 'dark'});
      return { ...result, [cur]: color };
    }, {});
    this.setState({ messages, userColors });
  }

  renderMessages() {
    const { messages, userColors } = this.state;
    if (!messages) {
      return <Text>There are no messages yet</Text>;
    }
    return Object.keys(messages).sort().map((item, i) => (
      <Text key={item + i} style={styles.message}>
        <Text style={{ fontWeight: 'bold', color: userColors[messages[item].user] }} >
          {messages[item].user}:&nbsp;
        </Text>
        {messages[item].message}
      </Text>
    ));
  }

  sendMessage() {
    firebaseDB.ref('messages/' + Date.now()).set({
      user: firebaseAuth.currentUser.displayName,
      message: this.state.newMessage,
    });
    this.setState({newMessage: ''});
  }

  handleMessagesContentSizeChange() {
    this.refs.messagesView.scrollToEnd()
  }

  render() {
    const Wrapper = this.wrapper;
    return (
      <Wrapper {...this.wrapperProps} >
        <ScrollView
          contentContainerStyle={styles.messages}
          onContentSizeChange={this.handleMessagesContentSizeChange}
          ref='messagesView'
        >
          {this.renderMessages()}
        </ScrollView>
        <View style={styles.inputWrap}>
          <TextInput
            autoFocus
            onChangeText={newMessage => this.setState({newMessage})}
            onSubmitEditing={this.sendMessage}
            style={styles.input}
            value={this.state.newMessage}
          />
          <TouchableHighlight style={styles.sendBtn} onPress={this.sendMessage}>
            <Text style={styles.btnText}>SEND</Text>
          </TouchableHighlight>
        </View>
      </Wrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.superLightOrange,
  },
  messages: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5,
    backgroundColor: colors.superLightOrange,
  },
  inputWrap: {
    flexDirection: 'row',
    height: 40,
    width: '100%',
    backgroundColor: colors.baseWhite,
  },
  input: {
    flex: 1,
    height: 40,
  },
  sendBtn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.baseRed,
    width: 50,
  },
  btnText: {
    color: colors.baseWhite,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
  }
});
export default Chat;
