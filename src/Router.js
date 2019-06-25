import React from 'react'

import { Text } from 'react-native'
import {createStackNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation'

//import Images from '@assets/images'
//import {Svg, Image} from 'react-native-svg'

//Screens
import PublicMatchesFeedScreen from './screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen'
import MockScreen1 from './screens/MockScreen1/MockScreen1'
import MockScreen2 from './screens/MockScreen2/MockScreen2'
import HeaderBar from './components/HeaderBar/HeaderBar';

const TabMainNavigator = createBottomTabNavigator({
  
  Retas: {
    screen: PublicMatchesFeedScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Reta',  //Tried to hide this for next tab Search.
      tabBarIcon: ({ tintColor, focused }) => (
        <Text>
          Retas
        </Text>
      )
    })
  },
  Mock1: {
    screen: MockScreen1,
    navigationOptions: ({ navigation }) => ({
      //If no title it shows the name as Search.
      title: 'Mock 1',
      tabBarIcon: ({ tintColor, focused }) => (
        <Text>
          Mock 1
        </Text>
      )
    })

  },
  Mock2: {
    screen:   MockScreen2,
    navigationOptions: ({ navigation }) => ({
      //If no title it shows the name as Search.
      title: 'Mock 1',
      tabBarIcon: ({ tintColor, focused }) => (
        <Text>
          Mock 2
        </Text>
      )
    })
  }
},
{ 
  tabBarOptions: {
    style: { backgroundColor: '#0C1021', height: 60, padding:0, margin:0 }
  }
});

const RootStack = createStackNavigator(
  {
    Home: {
      screen: TabMainNavigator,
      navigationOptions: {
        header: props => <HeaderBar {...props} />
      }
    }
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Router extends React.Component {
  render() {
    return <AppContainer/>;
  }
}


//<Image source={Images.mock1Icon} style={{width: 40, height: 40}} resizeMode='contain' color='#36E5CE' />

// <Image source={Images.publicFeedMatchIcon}
//                  style={{width: 40, height: 40}} 
//                  resizeMode='contain'
//                  color='white'
//                  tintColor={focused ? '#0000' : '#36E5CE'}/>
