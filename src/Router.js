// diego           - 20-12-2019 - us179 - Verification moved to RootStack
// diego           - 17-12-2019 - us171 - Remove navigationOptions from LoginWithEmailScreen
// diego           - 17-12-2019 - us172 - ChooseUserNameScreen moved to RootStack
// diego           - 12-12-2019 - us166 - Remove header from CheckOutPaymentScreen
// diego           - 22-11-2019 - us151 - Added TermsAndConditionsScreen
// josep.sanahuja  - 13-11-2019 - us147 - Add AppSettingsMenuScreen + Redux connect
// josep.sanahuja  - 04-10-2019 - XXXXX - Added TabtScreen
// diego           - 18-09-2019 - us119 - Added VerificationScreen
// diego           - 18-09-2019 - us110 - Created LogrosTabNavigator
// diego           - 18-09-2019 - us109 - Added Tab for logros on TabMainNavigator
// diego           - 03-09-2019 - us96 - Added TopNavOptions to allow users without back button navigate to previous screens
// diego           - 19-08-2019 - us89 - Added logic to show label only when tab is focused added on TabMainNavigator
// josep.sanahuja  - 12-08-2019 - us85 - + UploadMatchResult in AppNoHeaderStackNavigator
// josep.sanahuja  - 06-08-2019 - us78 - + UploadMatchResultScreen
// diego           - 01-08-2019 - us58 - created NotificationTabNavigator
// diego           - 25-07-2019 - us31 - added CheckOutPaymentScreen and unnecessary code removed

import React from 'react';

import { View, Text } from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createMaterialTopTabNavigator, createSwitchNavigator} from 'react-navigation';

import { setCurrentScreenId, setPreviousScreenId } from './actions/screensActions';
import { connect } from 'react-redux';
import Images from './../assets/images';

import WelcomeOnboardingScreen from './screens/WelcomeOnboardingScreen/WelcomeOnboardingScreen';
import PublicMatchesFeedScreen from './screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen';
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
import CheckOutPaymentScreen from './screens/CheckOutPaymentScreen/CheckOutPaymentScreen';
import ActivityNotificationsScreen from './screens/ActivityNotificationsScreen/ActivityNotificationsScreen';
import RetasNotificationsScreen from './screens/RetasNotificationsScreen/RetasNotificationsScreen';
import UploadMatchResultScreen from './screens/UploadMatchResultScreen/UploadMatchResultScreen';
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen';
import LogrosActivosScreen from './screens/LogrosActivosScreen/LogrosActivosScreen';
import LogrosCompletadosScreen from './screens/LogrosCompletadosScreen/LogrosCompletadosScreen';
import VerificationScreen from './screens/VerificationScreen/VerificationScreen';

import SupportScreen from './screens/SupportScreen/SupportScreen';
import AppSettingsMenuScreen from './screens/AppSettingsMenuScreen/AppSettingsMenuScreen';

import MockScreen1 from './screens/MockScreen1/MockScreen1';

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';
import NotificationsHeader from './components/NotificationsHeader/NotificationsHeader';
import BadgeForNotificationTab from './components/BadgeForNotificationTab/BadgeForNotificationTab';
import TopNavOptions from './components/TopNavOptions/TopNavOptions';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen/TermsAndConditionsScreen';

// Svg Icons
const ProfileIcon = Images.svg.profileIcon;
const PublicFeedMatchIcon = Images.svg.publicFeedMatchIcon;
const LogrosIcon = Images.svg.logrosIcon;
const SupportIcon = Images.svg.supportIcon;

const LogrosTabNavigator = createMaterialTopTabNavigator(
  {
    LogrosActivos: {
      screen: LogrosActivosScreen,
      navigationOptions: () => ({
        title: 'Activos'
      })
    },
    LogrosCompletados: {
      screen: LogrosCompletadosScreen,
      navigationOptions: () => ({
        title: 'Completados'
      })
    }
  },
  {
    initialRouteName: 'LogrosActivos',
    tabBarOptions: {
      upperCaseLabel: false,
      style: { backgroundColor: '#0C1021' },
      activeTintColor: '#36E5CE',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        borderBottomColor: '#36E5CE',
        borderBottomWidth: 2,
      }
    },
  }
);

const NotificationTabNavigator = createMaterialTopTabNavigator(
  {
    NotificationActividad: {
      screen: ActivityNotificationsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Actividad'
      })
    },
    NotificationRetas: {
      screen: RetasNotificationsScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Partidas',
        tabBarIcon: ({ tintColor, focused }) => (
          <BadgeForNotificationTab />
        )
      })
    }
  },
  {
    initialRouteName: 'NotificationActividad',
    tabBarOptions: {
      upperCaseLabel: false,
      showIcon: true,
      style: { backgroundColor: '#0C1021' },
      activeTintColor: '#36E5CE',
      inactiveTintColor: 'gray',
      indicatorStyle: {
        borderBottomColor: '#36E5CE',
        borderBottomWidth: 2,
      },
      tabStyle: {
        flexDirection: 'row-reverse'
      }
    },
  }
);

const RetasTabNavigator = createMaterialTopTabNavigator(
  {
    Publicas: {
      screen: PublicMatchesFeedScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Públicas',
      })
    },
    MisRetas: {
      screen: MyMatchesScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Mis Partidas'
      })
    }
  },
  {
    initialRouteName: 'Publicas',
    tabBarOptions: {
      upperCaseLabel: false,
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
  Logros: {
    screen: LogrosTabNavigator,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <View>
          <LogrosIcon width={25} height={25} style={{ alignSelf: 'center' }} color={focused ? '#36E5CE' : '#FFF'} />
            <Text style={{ color: focused? '#36E5CE' : '#FFF', fontSize: 12, lineHeight: 14 }}>Eventos</Text>
        </View>
      )
    })
  },
  Retas: {
    screen:   RetasTabNavigator,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <View>
          <PublicFeedMatchIcon width={25} height={25} style={{ alignSelf: 'center' }} color={focused ? '#36E5CE' : '#FFF'} />
            <Text style={{ color: focused? '#36E5CE' : '#FFF', fontSize: 12, lineHeight: 14 }}>Partidas</Text>
        </View>
      )
    })
  },
  Perfil: {
    screen:   UserProfileScreen,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor, focused }) => (
        <View>
          <ProfileIcon width={25} height={25} style={{ alignSelf: 'center' }} color={focused ? '#36E5CE' : '#FFF'}/>
            <Text style={{ color: focused? '#36E5CE' : '#FFF', fontSize: 12, lineHeight: 14 }}>Perfil</Text>
        </View>
      )
    })
  }
},
{
  tabBarOptions: {
    style: { backgroundColor: '#0C1021', height: 60, padding:0, margin:0 },
    showLabel: false,
    activeTintColor: '#36E5CE',
    tabStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }
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

const MatchWizardStackNavigator = createStackNavigator(
  {
    ChooseMatchType: {
      screen: ChooseMatchTypeScreen,
      navigationOptions: {
        header: props => <TopNavOptions close {...props} onCloseGoTo='Publicas' />
      }
    },
    LoadGames: {
      screen: LoadGamesScreen
    },
    ChooseOponent: {
      screen: ChooseOpponentScreen,
      navigationOptions: {
        header: null
      }
    },
    SetBet: {
      screen: SetBetScreen
    },
    CheckOut: {
      screen: CheckOutPaymentScreen
    }
  },
  {
    initialRouteName: 'LoadGames',
  }
);

const AppNoHeaderStackNavigator = createSwitchNavigator(
  {
    MatchWizard: {
      screen: MatchWizardStackNavigator
    },
    UploadMatchResult: {
      screen: UploadMatchResultScreen
    }
  }
);

class Router extends React.Component {
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
          screen: LoginWithEmailScreen
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
        },
        AppSettingsMenu:{
          screen: AppSettingsMenuScreen,
          navigationOptions: {
            header: props => <TopNavOptions back {...props} />
          }
        },
        Notifications: {
          screen: NotificationTabNavigator,
          navigationOptions: {
            header: props => <NotificationsHeader {...props} />
          }
        },
        MatchCard: {
          screen: PublicMatchCardScreen
        },
        Support: {
          screen: SupportScreen,
          navigationOptions: {
            header: props => <TopNavOptions back {...props} />
          }
        },
        TermsAndConditions: {
          screen: TermsAndConditionsScreen,
          navigationOptions: {
            header: props => <TopNavOptions back {...props} />
          }
        },
        Verification:{
          screen: VerificationScreen,
          navigationOptions: {
            header: null
          }
        },
        ChooseUserNameScreen: {
          screen: ChooseUserNameScreen,
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
        Welcome: WelcomeOnboardingScreen
      },
      {
        initialRouteName: 'AuthLoadingScreen'
      }
    );

    // Create main router entry point for the app
    const AppContainer = createAppContainer(MainNavigator);

    /**
     * @description
     * Gets the current screen from navigation state
     *
     * @param {Object} navigationState Navigation state object
     *
     * @return {string} Router name of the current screen
     */
    function getActiveRouteName(navigationState) {
        let res = null;

        if (navigationState) {
            const route = navigationState.routes[navigationState.index];

            // dive into nested navigators
            if (route.routes) {
                res = getActiveRouteName(route);
            }
            else {
                res = route.routeName;
            }
        }
        return res;
    }

    return (
      <AppContainer
          onNavigationStateChange={(prevState, currentState, action) => {
              const currentRouteName = getActiveRouteName(currentState);
              const previousRouteName = getActiveRouteName(prevState);

              if (previousRouteName !== currentRouteName) {
                  this.props.setCurrentScreenId(currentRouteName);
                  this.props.setPreviousScreenId(previousRouteName);
              }
          }}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentScreenId: (screenId) => setCurrentScreenId(screenId)(dispatch),
        setPreviousScreenId: (screenId) => setPreviousScreenId(screenId)(dispatch)
    };
}

export default connect(null, mapDispatchToProps)(Router);
