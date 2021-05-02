import React from 'react';

import { View, TouchableOpacity } from 'react-native';
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import Svg, { G, Path, Rect } from 'react-native-svg';

import { setCurrentScreenId, setPreviousScreenId } from './actions/screensActions';
import { connect } from 'react-redux';

import WelcomeOnboardingScreen from './screens/WelcomeOnboardingScreen/WelcomeOnboardingScreen';
import PublicMatchesFeedScreen from './screens/PublicMatchesFeedScreen/PublicMatchesFeedScreen';
import MyMatchesScreen from './screens/MyMatchesScreen/MyMatchesScreen';
import PublicMatchCardScreen from './screens/PublicMatchCardScreen/PublicMatchCardScreen';
import SignUpLoginHandlerScreen from './screens/SignUpLogInScreen/SignUpLoginHandlerScreen';
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
import NewUserProfileScreen from './screens/NewUserProfileScreen/NewUserProfileScreen';
import LogrosActivosScreen from './screens/LogrosActivosScreen/LogrosActivosScreen';
// import VerificationScreen from './screens/VerificationScreen/VerificationScreen';
import SupportScreen from './screens/SupportScreen/SupportScreen';
import AppSettingsMenuScreen from './screens/AppSettingsMenuScreen/AppSettingsMenuScreen';
import LinkBrokenScreen from './screens/LinkBrokenScreen/LinkBrokenScreen';
import ChatScreen from './screens/ChatScreen/ChatScreen';
import ExchangeQoins from './screens/ExchangeQoins/ExchangeQoins';

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';
import NotificationsHeader from './components/NotificationsHeader/NotificationsHeader';
import BadgeForNotificationTab from './components/BadgeForNotificationTab/BadgeForNotificationTab';
import TopNavOptions from './components/TopNavOptions/TopNavOptions';
import { widthPercentageToPx } from './utilities/iosAndroidDim';
import { translate } from './utilities/i18';
import NotificationsSettingsScreen from './screens/NotificationsSettingsScreen/NotificationsSettingsScreen';
import TodayTournamentsScreen from './screens/TodayTournamentsScreen/TodayTournamentsScreen';
import QaplaText from './components/QaplaText/QaplaText';
import ChatHeader from './components/Chat/ChatHeader/ChatHeader';
import CommunityScreen from './screens/CommunityScreen/CommunityScreen';
import DonationsLeaderBoard from './components/DonationsLeaderBoard/DonationsLeaderBoard';
import TwitchAuthScreen from './screens/TwitchAuthScreen/TwitchAuthScreen';

//#region Stack Navigators

const CheckOutStackNavigator = createStackNavigator({
  CheckOut: {
    screen: CheckOutPaymentScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    }
  }
});

const MatchWizardStackNavigator = createStackNavigator({
  ChooseMatchType: {
    screen: ChooseMatchTypeScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} onCloseNavigateTo='Public' />
    }
  },
  SelectGame: {
    screen: LoadGamesScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions back close {...props} />
    }
  },
  SetBet: SetBetScreen
},
  {
    navigationOptions: {
      gesturesEnabled: false
    }
  });

const MatchDetailsStackNavigator = createStackNavigator({
  MatchDetails: {
    screen: PublicMatchCardScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    }
  },
  UploadMatchResult: {
    screen: UploadMatchResultScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    }
  }
});

const SettingsMenuStackNavigator = createStackNavigator({
  AppSettingsMenu: {
    screen: AppSettingsMenuScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    }
  },
  Support: {
    screen: SupportScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions back close {...props} />
    }
  },
  NotificationsSettings: {
    screen: NotificationsSettingsScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions back close {...props} />
    }
  }
});

const AddGameStackNavigator = createStackNavigator({
  AddGame: {
    screen: LoadGamesScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    }
  }
});

/**
 * @deprecated
 */
/* const VerificationStackNavigator = createStackNavigator({
    Verification: VerificationScreen
},{
    headerMode: 'none'
}); */

const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignUpLoginHandlerScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    }
  },
  LogIn: {
    screen: LoginWithEmailScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions back close {...props} />
    }
  },
  TwitchLogIn: {
    screen: TwitchAuthScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    }
  }
}, {
  navigationOptions: {
    gesturesEnabled: false
  }
});

const ChatStackNavigator = createStackNavigator({
  EventChat: {
    screen: ChatScreen,
    navigationOptions: {
      header: (props) => <ChatHeader {...props} />
    }
  }
});

//#endregion

//#region Top Tab Navigators

/** @deprecated
const MatchesTopTabNavigator = createMaterialTopTabNavigator(
  {
    Public: {
      screen: PublicMatchesFeedScreen,
      navigationOptions: {
        title: translate('router.topNavigators.matches.public')
      }
    },
    MyMatches: {
      screen: MyMatchesScreen,
      navigationOptions: {
        title: translate('router.topNavigators.matches.myMatches')
      }
    }
  },
  {
    tabBarOptions: {
      upperCaseLabel: false,
      style: {
        backgroundColor: '#0C1021'
      },
      tabStyle: {
        width: widthPercentageToPx(35)
      },
      labelStyle: {
        fontSize: 14,
        fontFamily: 'SFRounded-Ultralight',
        fontWeight: 'bold'
      },
      activeTintColor: '#FFF',
      inactiveTintColor: '#FFF',
      indicatorStyle: {
        borderBottomColor: '#36E5CE',
        borderBottomWidth: 2,
        width: widthPercentageToPx(35)
      }
    },
  }
);*/

const NotificationsTopTabNavigator = createMaterialTopTabNavigator(
  {
    NotificationActividad: {
      screen: ActivityNotificationsScreen,
      navigationOptions: {
        title: translate('router.topNavigators.notifications.activity')
      }
    },
    NotificationRetas: {
      screen: RetasNotificationsScreen,
      navigationOptions: {
        title: translate('router.topNavigators.notifications.matches'),
        tabBarIcon: ({ tintColor, focused }) => (
          <BadgeForNotificationTab />
        )
      }
    }
  },
  {
    initialRouteName: 'NotificationActividad',
    navigationOptions: {
      header: (props) => <NotificationsHeader {...props} />
    },
    tabBarOptions: {
      upperCaseLabel: false,
      style: {
        backgroundColor: '#0C1021'
      },
      tabStyle: {
        width: widthPercentageToPx(35)
      },
      labelStyle: {
        fontSize: 14,
        fontFamily: 'SFRounded-Ultralight',
        fontWeight: 'bold'
      },
      activeTintColor: '#FFF',
      inactiveTintColor: '#FFF',
      indicatorStyle: {
        borderBottomColor: '#36E5CE',
        borderBottomWidth: 2,
        width: widthPercentageToPx(35)
      }
    },
  }
);

//#endregion

//#region Bottom Tab Navigator

const MainBottomTabNavigator = createBottomTabNavigator({
  Achievements: {
    screen: LogrosActivosScreen,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <Svg width="30px" height="26px" viewBox="2 0 26 26">
          <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <G id="Profile" transform="translate(-48.000000, -744.000000)">
              <G id="Bottom-Nav-Bar" transform="translate(0.000000, 731.000000)">
                <G id="Events" transform="translate(0.000000, 12.000000)">
                  <G id="controller-play" transform="translate(48.000000, 0.000000)">
                    <G id="Controller" transform="translate(0.000000, 6.250000)">
                      <Path fill={tintColor} d="M1.81575,5.4747875 C2.2067125,2.3471 4.8654625,0 8.0174875,0 L21.98275,0 C25.13475,0 27.7935,2.3471 28.1845,5.4747875 L29.1525,13.219625 C29.602625,16.82 26.795375,20 23.167,20 C21.162625,20 19.375625,19.01925 18.2765,17.5 L11.723675,17.5 C10.624625,19.01925 8.8376125,20 6.8332,20 C3.204875,20 0.3976025,16.82 0.84764,13.219625 L1.81575,5.4747875 Z" id="Path"></Path>
                      <Path fill={focused ? '#4040FF' : '#FFF'} d="M10,5 C9.30965,5 8.75,5.55965 8.75,6.25 L8.75,7.5 L7.5,7.5 C6.80965,7.5 6.25,8.059625 6.25,8.75 C6.25,9.440375 6.80965,10 7.5,10 L8.75,10 L8.75,11.25 C8.75,11.940375 9.30965,12.5 10,12.5 C10.6903625,12.5 11.25,11.940375 11.25,11.25 L11.25,10 L12.5,10 C13.190375,10 13.75,9.440375 13.75,8.75 C13.75,8.059625 13.190375,7.5 12.5,7.5 L11.25,7.5 L11.25,6.25 C11.25,5.55965 10.6903625,5 10,5 Z" id="Path" fill-rule="nonzero"></Path>
                      <Path fill={focused ? '#4040FF' : '#FFF'} d="M22.5,7.5 C23.190375,7.5 23.75,6.9403625 23.75,6.25 C23.75,5.5596375 23.190375,5 22.5,5 C21.809625,5 21.25,5.5596375 21.25,6.25 C21.25,6.9403625 21.809625,7.5 22.5,7.5 Z" id="Path" fill-rule="nonzero"></Path>
                      <Path fill={focused ? '#4040FF' : '#FFF'} d="M20,12.5 C20.690375,12.5 21.25,11.940375 21.25,11.25 C21.25,10.559625 20.690375,10 20,10 C19.309625,10 18.75,10.559625 18.75,11.25 C18.75,11.940375 19.309625,12.5 20,12.5 Z" id="Path" fill-rule="nonzero"></Path>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </G>
        </Svg>
      ),
      tabBarLabel: ({ tintColor, focused }) => (
        <QaplaText style={{ color: tintColor, fontSize: 12, marginBottom: 8 }}>
          {translate('router.bottomNavigators.mainNavigator.events')}
        </QaplaText>
      ),
    },
  },
  Ranking: {
    screen: DonationsLeaderBoard,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <Svg width="30px" height="26px" viewBox="0 0 30 26">
          <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Community" transform="translate(-127.000000, -746.000000)">
                  <G id="Bottom-Nav-Bar" transform="translate(0.000000, 727.000000)">
                      <G id="Community" transform="translate(94.000000, 17.000000)">
                          <G id="Ranking" transform="translate(32.000000, 0.000000)">
                              <G id="Column-01-Up" transform="translate(1.250000, 2.500000)">
                                  <Rect fill={focused ? tintColor: '#FFF'}  x="10" y="0" width="7.5" height="25" rx="2.5"></Rect>
                                  <Rect fill={focused ? '#4040FF' : '#4E5166'} x="0" y="5" width="7.5" height="20" rx="2.5"></Rect>
                                  <Rect fill={focused ? '#4040FF' : '#4E5166'} x="20" y="10" width="7.5" height="15" rx="2.5"></Rect>
                              </G>
                          </G>
                      </G>
                  </G>
              </G>
          </G>
        </Svg>
      ),
      tabBarLabel: ({ tintColor, focused }) => (
        <QaplaText style={{ color: tintColor, fontSize: 12, marginBottom: 8 }}>
          Ranking
        </QaplaText>
      )
    }
  },
  Community: {
    screen: CommunityScreen,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <Svg width="26px" height="26px" viewBox="0 0 26 26">
          <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <G id="Profile" transform="translate(-175.000000, -745.000000)">
              <G id="Bottom-Nav-Bar" transform="translate(0.000000, 731.000000)">
                <G id="Community" transform="translate(125.000000, 12.000000)">
                  <G id="chat" transform="translate(48.000000, 0.000000)">
                    <G id="Comment" transform="translate(2.500000, 2.500000)">
                      <Path fill={tintColor} d="M4.6184625,0.61165 C2.5059,0.9331 0.8320625,2.4811 0.469325,4.5869625 C0.2165125,6.05465 0,7.9190625 0,10 C0,12.080875 0.2165125,13.945375 0.469325,15.413 C0.7807,17.22075 2.0582,18.617375 3.75,19.18 L3.75,23.4345 C3.75,24.402375 4.8026375,25.003 5.6359125,24.510625 L13.280125,19.993625 C16.048,19.94825 18.52975,19.670125 20.3815,19.388375 C22.494125,19.066875 24.168,17.518875 24.530625,15.413 C24.7835,13.945375 25,12.080875 25,10 C25,7.9190625 24.7835,6.05465 24.530625,4.5869625 C24.168,2.4811 22.494125,0.9331 20.3815,0.61165 C18.357375,0.3036625 15.5805,0 12.5,0 C9.4194875,0 6.6426375,0.3036625 4.6184625,0.61165 Z" id="Path"></Path>
                      <Path fill={focused ? '#4040FF' : '#FFF'} d="M19.3318519,8.97228158 C18.6598227,8.55105931 17.768351,8.74615248 17.3407879,9.40813407 C17.3229757,9.43554796 15.5280615,12.1591821 12.5,12.1591821 C9.47193853,12.1591821 7.67702426,9.43554796 7.65921214,9.40813407 C7.23157688,8.7462235 6.34017731,8.55113033 5.66814814,8.97228158 C4.99611897,9.39350385 4.79802216,10.2714586 5.22565742,10.9331561 C5.33296286,11.0992019 7.90627426,15 12.5,15 C17.0937257,15 19.6670371,11.099273 19.7743426,10.9331561 C20.2019778,10.2713166 20.003881,9.39350385 19.3318519,8.97228158" id="Shape"></Path>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </G>
        </Svg>
      ),
      tabBarLabel: ({ tintColor, focused }) => (
        <QaplaText style={{ color: tintColor, fontSize: 12, marginBottom: 8 }}>
          {translate('router.bottomNavigators.mainNavigator.community')}
        </QaplaText>
      ),
    }
  },
  Profile: {
    screen: NewUserProfileScreen,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <Svg width="24px" height="28px" viewBox="0 0 26 26">
          <G id="UI" stroke="none" stroke-width="1" fill-rule="evenodd">
            <G id="Events-(Waiting-Aproval)" transform="translate(-301.000000, -744.000000)">
              <G id="Bottom-Nav-Bar" transform="translate(0.000000, 732.000000)">
                <G id="Profile" transform="translate(250.000000, 11.000000)">
                  <G id="user-profile" transform="translate(48.000000, 0.000000)">
                    <G id="User" transform="translate(3.750000, 1.250000)">
                      <Path fill={focused ? tintColor : '#FFF'} d="M17.5,6.25 C17.5,9.701775 14.70175,12.5 11.25,12.5 C7.798225,12.5 5,9.701775 5,6.25 C5,2.798225 7.798225,0 11.25,0 C14.70175,0 17.5,2.798225 17.5,6.25 Z" id="Path" fill-rule="nonzero"></Path>
                      <Path fill={focused ? '#3B4BF9' : tintColor} d="M19.7725,16.406 C19.002,15.512625 17.6785,15.558625 16.643625,16.125125 C15.04225,17.001625 13.204375,17.5 11.25,17.5 C9.295625,17.5 7.457725,17.001625 5.8563125,16.125125 C4.8214625,15.558625 3.4980125,15.512625 2.7275,16.406 C1.027775,18.37675 0,20.943375 0,23.75 L0,25 C0,26.380625 1.1192875,27.5 2.5,27.5 L20,27.5 C21.38075,27.5 22.5,26.380625 22.5,25 L22.5,23.75 C22.5,20.943375 21.47225,18.37675 19.7725,16.406 Z" id="Path"></Path>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </G>
        </Svg>
      ),
      tabBarLabel: ({ tintColor, focused }) => (
        <QaplaText style={{ color: tintColor, fontSize: 12, marginBottom: 8 }}>
          {translate('router.bottomNavigators.mainNavigator.profile')}
        </QaplaText>
      ),
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#0C1021',
      height: 60,
      padding: 0,
      margin: 0,
      borderTopColor: 'transparent'
    },
    showLabel: true,
    activeTintColor: '#36E5CE',
    inactiveTintColor: 'rgba(255, 255, 255, .25)',
    tabStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    showIcon: true
  }
}
);

//#endregion

//#region Root Stack Navigator

const RootStackNavigator = createStackNavigator({
  MainBottomNavigator: {
    screen: MainBottomTabNavigator,
    navigationOptions: {
      header: (props) => <HeaderBar {...props} />
    }
  },
  Notifications: {
    screen: NotificationsTopTabNavigator,
    navigationOptions: {
      header: (props) => <NotificationsHeader {...props} />
    }
  },
  MatchWizard: MatchWizardStackNavigator,
  ChatStackNavigator: ChatStackNavigator,
  MatchDetails: MatchDetailsStackNavigator,
  SettingsMenu: SettingsMenuStackNavigator,
  AddGame: AddGameStackNavigator,
  CheckOut: CheckOutStackNavigator,
  Auth: AuthStackNavigator,
  ExchangeQoinsScreen: {
    screen: ExchangeQoins,
    navigationOptions: {
      header: (props) => <TopNavOptions close onCloseNavigateTo='Profile' {...props} />
    }
  },
  TodayEvents: {
    screen: TodayTournamentsScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close onCloseNavigateTo='Achievements' {...props} />
    }
  }
}, {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null,
    headerVisible: false
  }
});

//#endregion

//#region Switch Navigator

const MainSwitchNavigator = createSwitchNavigator({
  SplashScreen: AuthLoadingScreen,
  App: RootStackNavigator,
  onBoarding: WelcomeOnboardingScreen,
  ChooseUserName: ChooseUserNameScreen,
  LinkBroken: LinkBrokenScreen
});

//#endregion

// Create main router entry point for the app
const AppContainer = createAppContainer(MainSwitchNavigator);

/**
 * @description Gets the current screen from navigation state
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

class Router extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.forceNavigation && this.props.forceNavigation !== prevProps.forceNavigation) {
      this.navigator &&
        this.navigator.dispatch(
          NavigationActions.navigate({ routeName: this.props.forceNavigation })
        );
    }
  }

  render() {
    return (
      <AppContainer
        ref={(navigator) => this.navigator = navigator}
        onNavigationStateChange={(prevState, currentState, action) => {
          const currentRouteName = getActiveRouteName(currentState);
          const previousRouteName = getActiveRouteName(prevState);

          if (previousRouteName !== currentRouteName) {
            this.props.setCurrentScreenId(currentRouteName);
            this.props.setPreviousScreenId(previousRouteName);
          }
        }} />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentScreenId: (screenId) => setCurrentScreenId(screenId)(dispatch),
    setPreviousScreenId: (screenId) => setPreviousScreenId(screenId)(dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Router);
