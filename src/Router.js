// josep.sanahuja  - 09-01-2020 - bug139 - TabMainNavigator's borderTopColor changed to transparent
// diego           - 27-12-2019 - us183  - Added styles on label and tabs of every TopTabNavigator
// diego           - 20-12-2019 - us179  - Verification moved to RootStack
// diego           - 17-12-2019 - us171  - Remove navigationOptions from LoginWithEmailScreen
// diego           - 17-12-2019 - us172  - ChooseUserNameScreen moved to RootStack
// diego           - 12-12-2019 - us166  - Remove header from CheckOutPaymentScreen
// diego           - 22-11-2019 - us151  - Added TermsAndConditionsScreen
// josep.sanahuja  - 13-11-2019 - us147  - Add AppSettingsMenuScreen + Redux connect
// josep.sanahuja  - 04-10-2019 - XXXXX  - Added TabtScreen
// diego           - 18-09-2019 - us119  - Added VerificationScreen
// diego           - 18-09-2019 - us110  - Created LogrosTabNavigator
// diego           - 18-09-2019 - us109  - Added Tab for logros on TabMainNavigator
// diego           - 03-09-2019 - us96   - Added TopNavOptions to allow users without back button navigate to previous screens
// diego           - 19-08-2019 - us89   - Added logic to show label only when tab is focused added on TabMainNavigator
// josep.sanahuja  - 12-08-2019 - us85   - + UploadMatchResult in AppNoHeaderStackNavigator
// josep.sanahuja  - 06-08-2019 - us78   - + UploadMatchResultScreen
// diego           - 01-08-2019 - us58   - created NotificationTabNavigator
// diego           - 25-07-2019 - us31   - added CheckOutPaymentScreen and unnecessary code removed

import React from 'react';

import { View, Text } from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator, createBottomTabNavigator} from 'react-navigation-tabs';

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

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';
import NotificationsHeader from './components/NotificationsHeader/NotificationsHeader';
import BadgeForNotificationTab from './components/BadgeForNotificationTab/BadgeForNotificationTab';
import TopNavOptions from './components/TopNavOptions/TopNavOptions';
import { widthPercentageToPx } from './utilities/iosAndroidDim';
import { translate } from './utilities/i18';

// Svg Icons
const ProfileIcon = Images.svg.profileIcon;
const PublicFeedMatchIcon = Images.svg.publicFeedMatchIcon;
const LogrosIcon = Images.svg.logrosIcon;

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
            header: (props) => <TopNavOptions close {...props} />
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
  defaultNavigationOptions :{
    gesturesEnabled: false
  },
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

const VerificationStackNavigator = createStackNavigator({
    Verification: VerificationScreen
},{
    headerMode: 'none'
});

const AuthStackNavigator = createStackNavigator({
    SignIn: {
        screen: SignInScreen,
        navigationOptions: {
            header: (props) => <TopNavOptions close {...props} />
        }
    },
    LogIn: {
        screen: LoginWithEmailScreen,
        navigationOptions: {
            header: (props) => <TopNavOptions back close {...props} />
        }
    }
},{
    navigationOptions: {
        gesturesEnabled: false
    }
});

//#endregion

//#region Top Tab Navigators

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
          fontSize: 14
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

const AchievementsTopTabNavigator = createMaterialTopTabNavigator(
    {
      LogrosActivos: {
        screen: LogrosActivosScreen,
        navigationOptions: () => ({
          title: translate('router.topNavigators.achievements.active')
        })
      },
      LogrosCompletados: {
        screen: LogrosCompletadosScreen,
        navigationOptions: () => ({
          title: translate('router.topNavigators.achievements.completed')
        })
      }
    },
    {
      initialRouteName: 'LogrosActivos',
      tabBarOptions: {
        upperCaseLabel: false,
        style: {
          backgroundColor: '#0C1021'
        },
        tabStyle: {
          width: widthPercentageToPx(36)
        },
        labelStyle: {
          fontSize: 14
        },
        activeTintColor: '#FFF',
        inactiveTintColor: '#FFF',
        indicatorStyle: {
          borderBottomColor: '#36E5CE',
          borderBottomWidth: 2,
          width: widthPercentageToPx(36)
        }
      }
    }
);

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
            fontSize: 14
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
            screen: AchievementsTopTabNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor, focused }) => (
                    <View>
                    <LogrosIcon width={25} height={25} style={{ alignSelf: 'center' }} color={focused ? '#36E5CE' : '#FFF'} />
                    <Text style={{ color: focused? '#36E5CE' : '#FFF', fontSize: 12, lineHeight: 14 }}>{translate('router.bottomNavigators.mainNavigator.events')}</Text>
                    </View>
                )
            }
        },
        Matches: {
            screen: MatchesTopTabNavigator,
            navigationOptions:{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View>
                    <PublicFeedMatchIcon width={25} height={25} style={{ alignSelf: 'center' }} color={focused ? '#36E5CE' : '#FFF'} />
                        <Text style={{ color: focused? '#36E5CE' : '#FFF', fontSize: 12, lineHeight: 14 }}>{translate('router.bottomNavigators.mainNavigator.matches')}</Text>
                    </View>
                )
            }
        },
        Profile: {
            screen: UserProfileScreen,
            navigationOptions:{
                tabBarIcon: ({ tintColor, focused }) => (
                    <View>
                    <ProfileIcon width={25} height={25} style={{ alignSelf: 'center' }} color={focused ? '#36E5CE' : '#FFF'}/>
                        <Text style={{ color: focused? '#36E5CE' : '#FFF', fontSize: 12, lineHeight: 14 }}>{translate('router.bottomNavigators.mainNavigator.profile')}</Text>
                    </View>
                )
            }
        }
    }, {
        tabBarOptions: {
            style: {
              backgroundColor: '#0C1021',
              height: 60,
              padding:0,
              margin:0,
              borderTopColor: 'transparent'
            },
            showLabel: false,
            activeTintColor: '#36E5CE',
            tabStyle: {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }
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
    MatchDetails: MatchDetailsStackNavigator,
    SettingsMenu: SettingsMenuStackNavigator,
    AddGame: AddGameStackNavigator,
    Verification: VerificationStackNavigator,
    CheckOut: CheckOutStackNavigator,
    Auth: AuthStackNavigator
},{
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
    ChooseUserName: ChooseUserNameScreen
});

//#endregion

class Router extends React.Component {
  render() {
    // Create main router entry point for the app
    const AppContainer = createAppContainer(MainSwitchNavigator);

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
