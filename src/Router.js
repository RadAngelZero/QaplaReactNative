import React from 'react'

import {View} from 'react-native'
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator} from 'react-navigation'

import Images from '@assets/images'
import {retrieveData} from './utilities/persistance'
import {Svg, Image} from 'react-native-svg'

// Screens
import WelcomeOnboardingScreen from './screens/WelcomeOnboardingScreen/WelcomeOnboardingScreen'
import PublicMatchesFeedScreen from './screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen'
import MyMatchesScreen from './screens/MyMatchesScreen/MyMatchesScreen';
import MockScreen1 from './screens/MockScreen1/MockScreen1'
import MockScreen2 from './screens/MockScreen2/MockScreen2'

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';

// Svg Icons
const Mock1Icon = Images.svg.favouritesIcon;
const Mock2Icon = Images.svg.testIcon;
const PublicFeedMatchIcon = Images.svg.publicFeedMatchIcon;

const RetasTabNavigator = createMaterialTopTabNavigator(
  {
    Publicas: {
      screen: PublicMatchesFeedScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'PÚBLICAS'
      })
    },
    MisRetas: {
      screen: MyMatchesScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'MIS RETAS'
      })
    }
  },
  {
    initialRouteName: 'Publicas',
    tabBarOptions: {
      style: { backgroundColor: '#0C1021' },
      activeTintColor: '#36E5CE',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        borderBottomColor: '#36E5CE',
        borderBottomWidth: 2,
      },
    },
  }
);

const TabMainNavigator = createBottomTabNavigator({
  Retas: {
    screen:   RetasTabNavigator,
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
    screen:   WelcomeOnboardingScreen,
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
    Welcome: {
      screen: WelcomeOnboardingScreen
    },
    Home: {
      screen: TabMainNavigator,
      navigationOptions: {
        header: props => <HeaderBar {...props} />
      }
    }
  },
  {
    initialRouteName: retrieveData('tutorial-done') == null ? 'Home' : 'Welcome',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class Router extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
