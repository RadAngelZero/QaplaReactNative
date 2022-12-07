import React from 'react';

import { Image, TouchableOpacity, View } from 'react-native';
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import Svg, { G, Path, Ellipse, Rect } from 'react-native-svg';
import { connect } from 'react-redux';

import { setCurrentScreenId, setPreviousScreenId } from './actions/screensActions';

import AuthLoadingScreen from './screens/AuthLoadingScreen/AuthLoadingScreen';
import ChooseUserNameScreen from './screens/ChooseUserNameScreen/ChooseUserNameScreen';
import TimelineStreams from './screens/TimelineStreams/TimelineStreams';
import LinkBrokenScreen from './screens/LinkBrokenScreen/LinkBrokenScreen';
import images from '../assets/images';

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';
import TopNavOptions from './components/TopNavOptions/TopNavOptions';
import { translate } from './utilities/i18';
import QaplaText from './components/QaplaText/QaplaText';
import DiscoverStreamersScreen from './screens/DiscoverStreamersScreen/DiscoverStreamersScreen';
import TwitchAuthScreen from './screens/TwitchAuthScreen/TwitchAuthScreen';
import ActivityScreen from './screens/ActivityScreen/ActivityScreen';
import QaplaTabBar from './components/QaplaTabBar/QaplaTabBar';
import StreamerProfileScreen from './screens/StreamerProfileScreen/StreamerProfileScreen';
import AuthHandlerScreen from './screens/AuthHandlerScreen/AuthHandlerScreen';
import FollowingStreamersScreen from './screens/FollowingStreamersScreen/FollowingStreamersScreen';
import WriteCheerMessageScreen from './screens/WriteCheerMessageScreen/WriteCheerMessageScreen';
import CheersSentScreen from './screens/CheersSentScreen/CheersSentScreen';
import MyStreamsScreen from './screens/MyStreamsScreen/MyStreamsScreen';
import { BOTTOM_NAVIGATION_BAR_HEIGHT } from './utilities/Constants';
import BuyQoins from './screens/BuyQoins/BuyQoins';
import UserProfileModal from './components/UserProfileModal/UserProfileModal';
import AvatarCreatorScreen from './screens/AvatarCreatorScreen/AvatarCreatorScreen';
import AvatarChooseAnimationScreen from './screens/AvatarChooseAnimationScreen/AvatarChooseAnimationScreen';
import AvatarChooseBackgroundScreen from './screens/AvatarChooseBackgroundScreen/AvatarChooseBackgroundScreen';
import AvatarOnboardingScreen from './screens/AvatarOnboardingScreen/AvatarOnboardingScreen';
import GreetingTTSScreen from './screens/GreetingTTSScreen/GreetingTTSScreen';
import AvatarReadyScreen from './screens/AvatarReadyScreen/AvatarReadyScreen';
import AvatarCreationHeaderBar from './components/AvatarCreationHeaderBar/AvatarCreationHeaderBar';
import GreetingSearchStreamerScreen from './screens/GreetingSearchStreamerScreen/GreetingSearchStreamerScreen';
import UploadContent from './screens/UploadContent/UploadContent';
import AddTags from './screens/UploadContent/AddTags';
import CommunityHeader from './components/CommunityHeader/CommunityHeader';
import TweetReactionControllerScreen from './screens/TweetReactionScreen/TweetReactionControllerScreen';

//#region Stack Navigators

const AuthStackNavigator = createStackNavigator({
  SignIn: {
    screen: AuthHandlerScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  TwitchLogIn: {
    screen: TwitchAuthScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    },
  }
}, {
  navigationOptions: {
    gestureEnabled: false
  },
});

const StreamerProfileStackNavigator = createStackNavigator({
  StreamerProfile: {
    screen: StreamerProfileScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false
    },
  },
  WriteCheerMessage: {
    screen: WriteCheerMessageScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false
    }
  },
  CheersSent: {
    screen: CheersSentScreen,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false
    },
  },
});

const ReactionsStackNavigator = createStackNavigator({
  TweetReactionScreen: TweetReactionControllerScreen
}, {
  defaultNavigationOptions: {
    header: null,
  },
});

const AvatarStackNavigator = createStackNavigator({
  AvatarOnboardingScreen: {
    screen: AvatarOnboardingScreen,
    navigationOptions: {
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  AvatarCreatorScreen: {
    screen: AvatarCreatorScreen,
    navigationOptions: {
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  AvatarChooseBackgroundScreen: {
    screen: AvatarChooseBackgroundScreen,
    navigationOptions: {
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  AvatarChooseAnimationScreen: {
    screen: AvatarChooseAnimationScreen,
    navigationOptions: {
      headerTransparent: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  AvatarChooseGreetingMessageScreen: {
    screen: GreetingTTSScreen,
    navigationOptions: {
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  AvatarReadyScreen: {
    screen: AvatarReadyScreen,
    navigationOptions: {
      headerTransparent: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
}, {
  defaultNavigationOptions: {
    header: (props) => <AvatarCreationHeaderBar {...props} />,
  },
});

const GreetingStackNavigator = createStackNavigator({
  GreetingSearchStreamerScreen: {
    screen: GreetingSearchStreamerScreen,
    navigationOptions: {
      headerShown: false,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    }
  }
});

//#endregion

//#region Top Tab Navigators

const StreamsTopTabNavigator = createMaterialTopTabNavigator(
  {
    Timeline: {
      screen: TimelineStreams,
    },
    MyStreams: {
      screen: MyStreamsScreen,
    },
  },
  {
    initialRouteName: 'Timeline',
    lazy: true,
    tabBarComponent: (props) => <QaplaTabBar {...props} />
  },
);

const CommunityTopTabNavigator = createMaterialTopTabNavigator(
  {
    Discover: {
      screen: DiscoverStreamersScreen,
    },
    Following: {
      screen: FollowingStreamersScreen,
    },
  },
  {
    initialRouteName: 'Discover',
    lazy: true,
    tabBarComponent: (props) => <QaplaTabBar {...props} />,
  },
);

//#endregion

//#region Bottom Tab Navigator

const MainBottomTabNavigator = createBottomTabNavigator({
  UserProfile: {
    screen: UserProfileModal,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1 }],
          backgroundColor: '#141833',
          height: 48,
          width: '100%',
          justifyContent: 'center',
          borderTopLeftRadius: 100,
          borderBottomLeftRadius: 100,
          alignItems: 'center',
        }}>
          <Svg width="32px" height="32px" viewBox="0 0 32 32">
            <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Profile" transform="translate(-48.000000, -744.000000)">
                <G id="Bottom-Nav-Bar" transform="translate(0.000000, 731.000000)">
                  <G id="Events" transform="translate(0.000000, 12.000000)">
                    <G id="controller-play" transform="translate(48.000000, 0.000000)">
                      <G id="Controller" transform="translate(0.000000, 2.250000)">
                        <Rect stroke={tintColor} x="1" y="1" width="30" height="30" rx="12.4333" stroke-width="2" />
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
          <Image
            style={{
              position: 'absolute',
              width: 24,
              height: 24,
              borderRadius: 10,
            }}
            source={{ uri: 'https://static-cdn.jtvnw.net/jtv_user_pictures/23ee9d3c-1491-46f2-893f-4a5395eeafac-profile_image-70x70.png' }}
          />
        </View>
      ),
    },
  },
  Explore: {
    screen: StreamsTopTabNavigator,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1 }],
          // flex: 1,
          backgroundColor: '#141833',
          height: 48,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Svg width="30px" height="30px" viewBox="0 0 30 33">
            <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Profile" transform="translate(-48.000000, -744.000000)">
                <G id="Bottom-Nav-Bar" transform="translate(0.000000, 731.000000)">
                  <G id="Events" transform="translate(0.000000, 12.000000)">
                    <G id="controller-play" transform="translate(48.000000, 0.000000)">
                      <G id="Controller" transform="translate(0.000000, 2.250000)">
                        <Path fill={tintColor} fill-rule="evenodd" clip-rule="evenodd" d="M26.761 7.33528C25.9678 7.21597 24.8851 7.27255 23.5618 7.53688C23.0541 7.6383 22.5603 7.30891 22.4589 6.80117C22.3574 6.29344 22.6868 5.79962 23.1946 5.6982C24.6312 5.41124 25.9504 5.31728 27.0399 5.48113C28.1173 5.64317 29.1324 6.08769 29.6771 7.03124C30.2217 7.97449 30.0994 9.07547 29.7013 10.0892C29.2989 11.1143 28.5584 12.2094 27.5922 13.3097C25.6122 15.5644 22.5318 18.0126 18.8436 20.142C15.1934 22.2495 11.5711 23.6848 8.645 24.2836C7.18702 24.582 5.84847 24.6839 4.74407 24.5239C3.65299 24.3659 2.62296 23.922 2.07259 22.9687C1.528 22.0255 1.65036 20.9245 2.0484 19.9107C2.4509 18.8856 3.1914 17.7905 4.15761 16.6902C4.49926 16.3012 5.0916 16.2627 5.48066 16.6044C5.86971 16.946 5.90814 17.5384 5.5665 17.9274C4.67654 18.9409 4.08671 19.8497 3.79369 20.596C3.49622 21.3536 3.55788 21.7913 3.69639 22.0312C3.83638 22.2737 4.19103 22.5492 5.01284 22.6683C5.82133 22.7854 6.92388 22.722 8.2691 22.4467C10.9494 21.8982 14.3819 20.5529 17.9061 18.5182C21.4677 16.4619 24.3721 14.135 26.1833 12.0725C27.0732 11.0591 27.663 10.1502 27.9561 9.40395C28.2535 8.64637 28.1919 8.20865 28.0533 7.96874C27.9148 7.72876 27.5664 7.4564 26.761 7.33528Z" />
                        <Path fill={tintColor} fill-rule="evenodd" clip-rule="evenodd" d="M3.875 15C3.875 8.37258 9.24758 3 15.875 3C21.5677 3 26.3345 6.96395 27.5659 12.2822C27.3981 12.4975 27.2132 12.7207 27.0107 12.9513C25.2502 14.9562 22.3986 17.2467 18.8749 19.2811C15.3885 21.294 12.013 22.6122 9.40639 23.1456C8.60101 23.3104 7.9011 23.3936 7.31417 23.4091C5.18704 21.2438 3.875 18.2751 3.875 15ZM10.8417 25.8965C12.3724 26.6048 14.0775 27 15.875 27C22.008 27 27.0664 22.3991 27.787 16.4606C25.8418 18.3094 23.2898 20.1963 20.3749 21.8792C17.022 23.815 13.6762 25.1996 10.8417 25.8965Z" />
                        <Ellipse fill={focused ? '#4040FF' : '#FFF'} cx="10.25" cy="15.625" rx="3.125" ry="3.125" />
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        </View>
      ),
    },
  },
  Upload: {
    screen: UploadContent,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1 }],
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
          backgroundColor: '#141833',
          height: 48,
          width: '100%',
        }}>
          <Svg width="30px" height="30px" viewBox="0 0 30 30">
            <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Profile" transform="translate(-175.000000, -745.000000)">
                <G id="Bottom-Nav-Bar" transform="translate(0.000000, 731.000000)">
                  <G id="Community" transform="translate(125.000000, 12.000000)">
                    <G id="chat" transform="translate(48.000000, 0.000000)">
                      <G id="Comment" transform="translate(2.500000, 2.500000)">
                        <Path fill={tintColor} d="M15 3C9.1846 3 4.48492 7.78872 4.22417 13.743C1.74181 14.7333 0 17.2378 0 20.1459C0 23.9037 2.91675 27 6.57447 27H22.0213C26.4545 27 30 23.2455 30 18.6757C30 15.3326 28.1081 12.435 25.359 11.1127C24.0574 6.4423 19.9278 3 15 3Z" />
                        <Path fill={focused ? '#4040FF' : '#FFF'} fill-rule="evenodd" clip-rule="evenodd" d="M14.2756 10.9813C14.7093 10.6729 15.2907 10.6729 15.7244 10.9813L20.0994 14.0924C20.662 14.4925 20.7938 15.2729 20.3937 15.8355C19.9936 16.3981 19.2132 16.5299 18.6506 16.1298L16.25 14.4227V20C16.25 20.6904 15.6904 21.25 15 21.25C14.3097 21.25 13.75 20.6904 13.75 20V14.4227L11.3494 16.1298C10.7868 16.5299 10.0064 16.3981 9.60631 15.8355C9.20624 15.2729 9.33799 14.4925 9.9006 14.0924L14.2756 10.9813Z" />
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        </View>
      ),
    },
  },
  Interactions: {
    screen: () => <></>, // We do not really want a screen here, we want to navigate to InteractionsStack (check tabBarOnPress)
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          marginLeft: 16,
          transform: [{ scale: 1 }],
          width: 48,
          height: 48,
          backgroundColor: '#3B4BF9',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
        }}>
          <images.svg.interactionsNumberIcon style={{ transform: [{ scale: 1.5 }], }} />
        </View>
      ),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.navigate('InteractionsStack');
      },
    },
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#0C1021',
      position: 'absolute',
      padding: 0,
      paddingHorizontal: '6%',
      height: 88,
      paddingBottom: 10,
      margin: 0,
      borderTopColor: 'transparent',
      alignSelf: 'center',
    },
    showLabel: false,
    activeTintColor: '#36E5CE',
    inactiveTintColor: 'rgba(255, 255, 255, .25)',
    tabStyle: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    showIcon: true,
  },
}
);

//#endregion

//#region Upload Content Stack Navigator

const UploadContentNavigator = createStackNavigator({
  AddTags: {
    screen: AddTags,
    navigationOptions: {
      headerShown: false,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
});

//#region Root Stack Navigator

const RootStackNavigator = createStackNavigator({
  MainBottomNavigator: {
    screen: MainBottomTabNavigator,
    navigationOptions: {
      header: (props) => {
        if (props.navigation.state.index === 0) {
          return <></>;
        } else {
          return <HeaderBar {...props} />;
        }
      },
    },
  },
  UploadContent: UploadContentNavigator,
  Activity: {
    screen: ActivityScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  Community: {
    screen: CommunityTopTabNavigator,
    navigationOptions: (props) => {
      return {
        header: <CommunityHeader {...props} />,
      }
    },
  },
  StreamerProfile: {
    screen: StreamerProfileStackNavigator,
    navigationOptions: {
      animationEnabled: false,
    },
  },
  Auth: AuthStackNavigator,
  ReactionsStack: ReactionsStackNavigator,
  AvatarStackNavigator: {
    screen: AvatarStackNavigator
  },
  GreetingStackNavigator: {
    screen: GreetingStackNavigator
  },
  BuyQoins: {
    screen: BuyQoins,
    navigationOptions: {
      headerShown: false,
    },
  },
  UserProfileModal: {
    screen: UserProfileModal,
    navigationOptions: {
      cardStyle: {
        backgroundColor: '#0D1021',
      },
    },
  }
}, {
  headerMode: 'screen',
  defaultNavigationOptions: {
    header: null,
    headerVisible: false,
  },
});

//#endregion

//#region Switch Navigator

const MainSwitchNavigator = createSwitchNavigator({
  SplashScreen: AuthLoadingScreen,
  App: RootStackNavigator,
  ChooseUserName: ChooseUserNameScreen,
  LinkBroken: LinkBrokenScreen,
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
