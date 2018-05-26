import React from 'react';
import { FlatList, Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Room } from '../components/Room';

export class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Home',
  };

  render() {
    const data = [{name: 'Living Room', key: 'livingroom'},
           {name: 'Kitchen', key: 'kitchen'},
           {name: 'Sleeping Room', key: 'sleepingroom'},
           {name: 'Сorridor', key: 'corridor'}];

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          data={data}
          renderItem={({item}) => <Room name={item.name} key={item.key} navigation={this.props.navigation}/>}
        />
      </View>
    );
  }
}
