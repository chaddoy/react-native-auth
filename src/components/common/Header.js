// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';

// Make a component
const Header = (props) => {
  const { viewStyle, textStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.title}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: '#e03a3a',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    paddingTop: 20,
    elevation: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 20,
    color: '#fff',
  },
};

// Make the component available to other parts of the app
export { Header };
