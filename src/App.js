import React from 'react';
import firebase from 'firebase';
import { View } from 'react-native';

import { Header, CardSection, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends React.Component {
  state = {
    loggedIn: null,
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyB1Iyf9C_zD_duwDxia7mfUBlJ8mJvnysg',
      authDomain: 'auth-bddc5.firebaseapp.com',
      databaseURL: 'https://auth-bddc5.firebaseio.com',
      projectId: 'auth-bddc5',
      storageBucket: 'auth-bddc5.appspot.com',
      messagingSenderId: '596293983037'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent = () => {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log out
            </Button>
          </CardSection>
        );

      case false:
        return <LoginForm />;
    
      default:
        return (
          <CardSection>
            <Spinner size="large" />
          </CardSection>
        );
    }
  }

  render() {
    return (
      <View>
        <Header title="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
