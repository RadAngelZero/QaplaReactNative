import React from 'react';

import { Image, Platform, TouchableOpacity, View } from 'react-native';
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import Svg, { G, Path, Ellipse } from 'react-native-svg';
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
import DiscoverStreamersScreen from './screens/DiscoverStreamersScreen/DiscoverStreamersScreen';
import TwitchAuthScreen from './screens/TwitchAuthScreen/TwitchAuthScreen';
import ActivityScreen from './screens/ActivityScreen/ActivityScreen';
import QaplaTabBar from './components/QaplaTabBar/QaplaTabBar';
import StreamerProfileScreen from './screens/StreamerProfileScreen/StreamerProfileScreen';
import FollowingStreamersScreen from './screens/FollowingStreamersScreen/FollowingStreamersScreen';
import WriteCheerMessageScreen from './screens/WriteCheerMessageScreen/WriteCheerMessageScreen';
import CheersSentScreen from './screens/CheersSentScreen/CheersSentScreen';
import MyStreamsScreen from './screens/MyStreamsScreen/MyStreamsScreen';
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
import BottomBarProfileIcon from './components/BottomBarProfileIcon/BottomBarProfileIcon';
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context';
import { heightPercentageToPx, widthPercentageToPx } from './utilities/iosAndroidDim';

//#region Stack Navigators

const AuthStackNavigator = createStackNavigator({
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
      // Do nothing, BottomBarProfileIcon handles the onPress event
      tabBarOnPress: (props) => null,
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => <BottomBarProfileIcon tintColor={tintColor} focused={focused} />,
    },
  },
  Explore: {
    screen: StreamsTopTabNavigator,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1 }],
          backgroundColor: '#141833',
          height: heightPercentageToPx(5.91),
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill={tintColor} fill-rule="evenodd" clip-rule="evenodd" d="M27.612 7.82514C26.7659 7.69788 25.6111 7.75824 24.1996 8.04018C23.658 8.14836 23.1312 7.79702 23.023 7.25543C22.9149 6.71385 23.2662 6.18711 23.8078 6.07893C25.3402 5.77284 26.7474 5.67261 27.9095 5.84739C29.0587 6.02023 30.1415 6.49438 30.7226 7.50084C31.3034 8.50697 31.1729 9.68135 30.7484 10.7627C30.3191 11.8561 29.5292 13.0242 28.4986 14.1979C26.3866 16.6029 23.1009 19.2143 19.1668 21.4857C15.2733 23.7336 11.4094 25.2647 8.28827 25.9034C6.73308 26.2216 5.3053 26.3303 4.12727 26.1597C2.96345 25.9911 1.86475 25.5177 1.27769 24.5008C0.696796 23.4947 0.827306 22.3203 1.25189 21.239C1.68122 20.1455 2.47109 18.9774 3.50172 17.8037C3.86614 17.3888 4.49797 17.3478 4.91296 17.7122C5.32795 18.0766 5.36895 18.7084 5.00453 19.1234C4.05524 20.2044 3.42608 21.1739 3.11353 21.9699C2.79623 22.778 2.862 23.2449 3.00974 23.5008C3.15907 23.7595 3.53736 24.0534 4.41395 24.1803C5.27634 24.3052 6.4524 24.2376 7.8873 23.944C10.7463 23.3589 14.4076 21.924 18.1668 19.7536C21.9659 17.5602 25.0639 15.0782 26.9958 12.8782C27.945 11.7972 28.5742 10.8277 28.8867 10.0317C29.204 9.22364 29.1382 8.75674 28.9905 8.50084C28.8427 8.24485 28.471 7.95434 27.612 7.82514Z" />
            <Path fill={tintColor} fill-rule="evenodd" clip-rule="evenodd" d="M3.25 16C3.25 8.95837 8.95837 3.25 16 3.25C22.1072 3.25 27.2115 7.5439 28.4587 13.2774C28.303 13.473 28.1346 13.6742 27.9532 13.8808C26.0663 16.0295 23.0152 18.4792 19.2499 20.6531C15.5244 22.8041 11.9137 24.215 9.1202 24.7866C8.32986 24.9484 7.63184 25.0373 7.03291 25.0639C4.69712 22.7529 3.25 19.5454 3.25 16ZM10.5641 27.5364C12.213 28.3148 14.0557 28.75 16 28.75C22.5491 28.75 27.945 23.8122 28.6677 17.4564C26.5961 19.4311 23.8693 21.4502 20.7499 23.2512C17.1624 25.3225 13.5853 26.7994 10.5641 27.5364Z" />
            <Ellipse cx="9.99984" cy="16.6673" rx="3.33333" ry="3.33333" fill={focused ? '#4040FF' : '#FFF'} />
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
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 100,
          borderBottomRightRadius: 100,
          backgroundColor: '#141833',
          height: heightPercentageToPx(5.91),
          width: '100%',
        }}>
          <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path fill={tintColor} d="M16 3C9.79691 3 4.78392 8.10797 4.50578 14.4592C1.85793 15.5155 0 18.187 0 21.289C0 25.2973 3.1112 28.6 7.01277 28.6H23.4894C28.2182 28.6 32 24.5952 32 19.7207C32 16.1547 29.9819 13.064 27.0496 11.6535C25.6612 6.67179 21.2563 3 16 3Z" />
            <Path fill={tintColor} d="M16 3C9.79691 3 4.78392 8.10797 4.50578 14.4592C1.85793 15.5155 0 18.187 0 21.289C0 25.2973 3.1112 28.6 7.01277 28.6H23.4894C28.2182 28.6 32 24.5952 32 19.7207C32 16.1547 29.9819 13.064 27.0496 11.6535C25.6612 6.67179 21.2563 3 16 3Z" />
            <Path fill={focused ? '#4040FF' : '#FFF'} fill-rule="evenodd" clip-rule="evenodd" d="M15.2274 11.7135C15.69 11.3846 16.3102 11.3846 16.7728 11.7135L21.4395 15.032C22.0396 15.4588 22.1801 16.2912 21.7534 16.8913C21.3266 17.4915 20.4942 17.632 19.8941 17.2053L17.3334 15.3844V21.3335C17.3334 22.0698 16.7365 22.6668 16.0001 22.6668C15.2637 22.6668 14.6668 22.0698 14.6668 21.3335V15.3844L12.1061 17.2053C11.506 17.632 10.6736 17.4915 10.2468 16.8913C9.82008 16.2912 9.96062 15.4588 10.5607 15.032L15.2274 11.7135Z" />
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
          width: '100%',
        }}>
          <View style={{
            marginLeft: 16,
            transform: [{ scale: 1 }],
            width: heightPercentageToPx(5.91),
            height: heightPercentageToPx(5.91),
            backgroundColor: '#3B4BF9',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 100,
          }}>
            <images.svg.zap height={24} width={24} />
          </View>
        </View>
      ),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.navigate('TweetReactionScreen');
      },
    },
  },
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#0C1021',
      position: 'absolute',
      paddingHorizontal: '6%',
      height: heightPercentageToPx(13.30) - 16,
      paddingBottom: 16,
      margin: 0,
      borderTopColor: 'transparent',
      // Blank space is (100% - 84.8%) / 2 = 7.6%, the 16 comes because to offset the star's margin
      paddingLeft: widthPercentageToPx(7.6) + 16
    },
    showLabel: false,
    activeTintColor: '#36E5CE',
    inactiveTintColor: '#2F384C',
    tabStyle: {
      width: widthPercentageToPx(84.8) / 4,
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
