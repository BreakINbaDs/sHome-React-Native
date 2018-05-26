import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class DetailsScreen extends React.Component {

  static navigationOptions = {
    title: 'Details',
  };

  render() {

    /* 2. Read the params from the navigation state */
   const { params } = this.props.navigation.state;
   const room = params ? params.name : null;
   const keyName = params ? params.keyName : null;

   return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{room}</Text>
        <View>
          <Text>Temperature:</Text>
          <Text>Humidity:</Text>
          <Text>Light:</Text>
          <Text>Motion:</Text>
        </View>
        <Button
          title="Commands"
          onPress={() => this.props.navigation.navigate('Command')}
        />
      </View>
    );
  }
}
