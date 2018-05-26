import React from 'react';
import { Button, View, Text } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ToggleSwitch from 'toggle-switch-react-native';
import { Client, Message } from 'react-native-paho-mqtt';

//Set up an in-memory alternative to global localStorage
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};
//Set up mqtt CLient instance
const client = new Client({ uri: 'ws://iot.eclipse.org/ws', port: 1883, clientId: 'sHome', storage: myStorage });

export class CommandScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {subscribed: false};

    this.sendCommand = this.sendCommand.bind(this);
  }

  static navigationOptions = {
    title: 'Commands Screen',
  };

  componentDidMount() {
    // set event handlers
    client.on('connectionLost', (responseObject) => {
      if (responseObject.errorCode !== 0) {
        console.log(responseObject.errorMessage);
      }
    });
    client.on('messageReceived', (message) => {
      console.log(message.payloadString);
    });

    client.connect()
      .then(() => {
        // Once a connection has been made, make a subscription and send a message.
        console.log('onConnect');
        return client.subscribe('iot/sHome');
      })
      .then(() => {
        this.setState({subscribed: true});
      });
  }


  sendCommand(cmd) {
    if(this.state.subscribed){
      const message = new Message(cmd);
      message.destinationName = 'iot/sHome';
      client.send(message);
    }
  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ToggleSwitch
            isOn={false}
            onColor='green'
            offColor='red'
            label='Light:'
            labelStyle={{color: 'black', fontWeight: '900'}}
            size='large'
            onToggle={ (isOn) => {console.log('changed to : ', isOn); this.sendCommand('Light:'+JSON.stringify(isOn))}}
        />
        <ToggleSwitch
            isOn={false}
            onColor='green'
            offColor='red'
            label='Heater:'
            labelStyle={{color: 'black', fontWeight: '900'}}
            size='large'
            onToggle={ (isOn) => {console.log('changed to : ', isOn); this.sendCommand('Heater:'+JSON.stringify(isOn))}}
        />
        <ToggleSwitch
            isOn={false}
            onColor='green'
            offColor='red'
            label='Alarm:'
            labelStyle={{color: 'black', fontWeight: '900'}}
            size='large'
            onToggle={ (isOn) => {console.log('changed to : ', isOn);  this.sendCommand('Alarm:'+JSON.stringify(isOn))}}
        />;
        <Button
          title="Go Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}
