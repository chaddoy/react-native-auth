import React from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends React.Component {
  state = {
    email: '',
    password: '',
    loggingIn: false,
    errMsg: '',
  }

  onLogin = () => {
    const { email, password } = this.state;

    this.setState({
      errMsg: '',
      loggingIn: true,
    });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess)
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess)
          .catch(this.onLoginFail);
      });
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loggingIn: false,
      errMsg: '',
    });
  }

  onLoginFail = () => {
    this.setState({
      loggingIn: false,
      errMsg: 'Authentication Failed.',
    });
  }

  renderBtn = () => (
    this.state.loggingIn ? (
      <Spinner size="small" />
    ) : (
      <Button onPress={this.onLogin}>Log in</Button>
    )
  )

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="user@email.com"
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errMsgStyle}>{this.state.errMsg}</Text>

        <CardSection>
          {this.renderBtn()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errMsgStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
  }
};

export default LoginForm;
