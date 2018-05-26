import React from 'react';
import { TouchableHighlight, Alert, Image, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const name = this.props.name;
    const key = this.props.keyName;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Details', {name: name, keyName: key})}>
          <Text>{this.props.name}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
