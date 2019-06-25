import React from 'react'

import {View} from 'react-native'
import {createStackNavigator,createBottomTabNavigator, createAppContainer} from 'react-navigation'

import Images from '@assets/images'
import {Svg, Image} from 'react-native-svg'

// Screens
import PublicMatchesFeedScreen from './screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen'
import MockScreen1 from './screens/MockScreen1/MockScreen1'
import MockScreen2 from './screens/MockScreen2/MockScreen2'

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';

// Svg Icons
const RetasIcon = Images.svg.testIcon;
const Mock1Icon = Images.svg.favouritesIcon;
const Mock2Icon = Images.svg.testIcon;
const PublicFeedMatchIcon = Images.svg.publicFeedMatchIcon;

const TabMainNavigator = createBottomTabNavigator({
  
  Retas: {
    screen:   PublicMatchesFeedScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Home",  //Tried to hide this for next tab Search.,
      tabBarIcon: ({ tintColor, focused }) => (
        <View>
          <Svg >
          <PublicFeedMatchIcon width={25} height={25} color={focused ? "#36E5CE": 'gray'} />
          </Svg>
        </View>
      )
    })
  },
  Mock1: {
    screen:   MockScreen1,
    navigationOptions: ({ navigation }) => ({
      //If no title it shows the name as Search.
      title: "Mock 1",
      tabBarIcon: ({ tintColor, focused }) => (
        <View>
          <Mock1Icon width={25} height={25} fill={focused ? "#36E5CE": 'gray'}/>  
        </View>
      )
    })

  },
  Mock2: {
    screen:   MockScreen2,
    navigationOptions: ({ navigation }) => ({
      //If no title it shows the name as Search.
      title: "Mock 2",
      tabBarIcon: ({ tintColor, focused }) => (
        <View>
          <Mock2Icon width={25} height={25} color={focused ? "#36E5CE": 'gray'}/> 
        </View>
      )
    })
  }
},
{ 
  tabBarOptions: {
    style: { backgroundColor: '#0C1021', height: 60, padding:0, margin:0 },
    activeTintColor: '#36E5CE'
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


//<Image source={Images.mock1Icon} style={{width: 40, height: 40}} resizeMode="contain" color="#36E5CE" />

// <Image source={Images.publicFeedMatchIcon}
//                  style={{width: 40, height: 40}} 
//                  resizeMode="contain"
//                  color="white"
//                  tintColor={focused ? '#0000' : '#36E5CE'}/>
