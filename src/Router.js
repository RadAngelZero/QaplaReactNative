import React from 'react'

import {View} from 'react-native'
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator} from 'react-navigation'

import Images from '@assets/images'
import {Svg, Image} from 'react-native-svg'

// Screens
import WelcomeOnboardingScreen from './screens/WelcomeOnboardingScreen/WelcomeOnboardingScreen'
import PublicMatchesFeedScreen from './screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen'
import MyMatchesScreen from './screens/MyMatchesScreen/MyMatchesScreen';
import PublicMatchCardScreen from './screens/PublicMatchCardScreen/PublicMatchCardScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen/AuthLoadingScreen';
import LoginWithEmailScreen from './screens/LoginWithEmailScreen/LoginWithEmailScreen';
import ChooseUserNameScreen from './screens/ChooseUserNameScreen/ChooseUserNameScreen';
import ChooseMatchTypeScreen from './screens/ChooseMatchTypeScreen/ChooseMatchTypeScreen';
import LoadGamesScreen from './screens/LoadGamesScreen/LoadGamesScreen';
import ChooseOpponentScreen from './screens/ChooseOpponentScreen/ChooseOpponentScreen';
import SetBetScreen from './screens/SetBetScreen/SetBetScreen';

// Mock screen
import MockScreen1 from './screens/MockScreen1/MockScreen1'
import MockScreen2 from './screens/MockScreen2/MockScreen2'

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';
import CheckOutPaymentScreen from './screens/CheckOutPaymentScreen/CheckOutPaymentScreen';

// Svg Icons
const Mock1Icon = Images.svg.favouritesIcon;
const Mock2Icon = Images.svg.testIcon;
const PublicFeedMatchIcon = Images.svg.publicFeedMatchIcon;

const PublicFeedMatchStackNavigator = createStackNavigator(
  {
    Home: {
      screen: PublicMatchesFeedScreen
    },
    MatchCard: {
      screen: PublicMatchCardScreen,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const RetasTabNavigator = createMaterialTopTabNavigator(
  {
    Publicas: {
      screen: PublicMatchesFeedScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'PÚBLICAS',
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

const AppWithHeaderStackNavigator = createStackNavigator(
  {
    HomeScreen: {
      screen: TabMainNavigator
    }
  },
  {
    initialRouteName: 'HomeScreen',
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const AppNoHeaderStackNavigator = createSwitchNavigator(
  {
    MatchCard: {
      screen: PublicMatchCardScreen,
    },
    ChooseMatchType: {
      screen: ChooseMatchTypeScreen
    },
    LoadGames: {
      screen: LoadGamesScreen
    },
    ChooseOponent: {
      screen: ChooseOpponentScreen
    },
    SetBet: {
      screen: SetBetScreen
    },
    CheckOut: {
      screen: CheckOutPaymentScreen
    }
  }
);

export default class Router extends React.Component {

  constructor(props) {
    super(props);
  
    this.state = {};
  }

  componentDidMount() {
    
  }

  render() {
    // or not shown
    const RootStack = createStackNavigator(
    {
      SignIn: {
        screen: SignInScreen,
        navigationOptions: {
          header: null
        }
      },
      Login: {
        screen: LoginWithEmailScreen,
        navigationOptions: {
          header: null
        }
      },
      Home: {
        screen: AppWithHeaderStackNavigator,
        navigationOptions: {
          header: props => <HeaderBar {...props} />
        }
      },
      NoHeader: {
        screen: AppNoHeaderStackNavigator,
        navigationOptions: {
          header: null
        }
      } 

    },
    {
      initialRouteName:  'Home'
    }
    );

    const MainNavigator = createSwitchNavigator(
      {
        AuthLoadingScreen: AuthLoadingScreen,
        App: RootStack,
        Welcome: WelcomeOnboardingScreen,
        ChooseUserNameScreen: ChooseUserNameScreen
      },
      {
        initialRouteName: 'AuthLoadingScreen'
      }
    );
    
    // Create main router entry point for the app
    const AppContainer = createAppContainer(MainNavigator);

    // render de main router entry point for the app
    return <AppContainer/>
  }
}
