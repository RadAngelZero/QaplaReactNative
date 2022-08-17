import React from 'react';

import { TouchableOpacity, View, Text } from 'react-native';
import { createAppContainer, createSwitchNavigator, NavigationActions } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs';
import Svg, { G, Path, Rect, Ellipse } from 'react-native-svg';
import { connect } from 'react-redux';
import { BlurView } from '@react-native-community/blur';

import { setCurrentScreenId, setPreviousScreenId } from './actions/screensActions';

import WelcomeOnboardingScreen from './screens/WelcomeOnboardingScreen/WelcomeOnboardingScreen';
import AuthLoadingScreen from './screens/AuthLoadingScreen/AuthLoadingScreen';
import ChooseUserNameScreen from './screens/ChooseUserNameScreen/ChooseUserNameScreen';
import UserProfileScreen from './screens/UserProfileScreen/UserProfileScreen';
import TimelineStreams from './screens/TimelineStreams/TimelineStreams';
import SupportScreen from './screens/SupportScreen/SupportScreen';
import AppSettingsMenuScreen from './screens/AppSettingsMenuScreen/AppSettingsMenuScreen';
import LinkBrokenScreen from './screens/LinkBrokenScreen/LinkBrokenScreen';
import images from '../assets/images';

// Components
import HeaderBar from './components/HeaderBar/HeaderBar';
import TopNavOptions from './components/TopNavOptions/TopNavOptions';
import { translate } from './utilities/i18';
import NotificationsSettingsScreen from './screens/NotificationsSettingsScreen/NotificationsSettingsScreen';
import QaplaText from './components/QaplaText/QaplaText';
import DiscoverStreamersScreen from './screens/DiscoverStreamersScreen/DiscoverStreamersScreen';
import DonationsLeaderBoard from './components/DonationsLeaderBoard/DonationsLeaderBoard';
import TwitchAuthScreen from './screens/TwitchAuthScreen/TwitchAuthScreen';
import ActivityScreen from './screens/ActivityScreen/ActivityScreen';
import QaplaTabBar from './components/QaplaTabBar/QaplaTabBar';
import StreamerProfileScreen from './screens/StreamerProfileScreen/StreamerProfileScreen';
import AuthHandlerScreen from './screens/AuthHandlerScreen/AuthHandlerScreen';
import FollowingStreamersScreen from './screens/FollowingStreamersScreen/FollowingStreamersScreen';
import WriteCheerMessageScreen from './screens/WriteCheerMessageScreen/WriteCheerMessageScreen';
import CheersSentScreen from './screens/CheersSentScreen/CheersSentScreen';
import MyStreamsScreen from './screens/MyStreamsScreen/MyStreamsScreen';
import InteractionsFeed from './screens/Interactions/InteractionsFeed';
import { BOTTOM_NAVIGATION_BAR_HEIGHT } from './utilities/Constants';
import InteractionsSearchStreamer from './screens/Interactions/InteractionsSearchStreamer';
import InteractionsPersonalize from './screens/Interactions/InteractionsPersonalize';
import InteractionsGiphyMediaSelector from './screens/Interactions/InteractionsGiphyMediaSelector';
import PersonalizeInteractionHeader from './components/PersonalizeInteractionHeader/PersonalizeInteractionHeader';
import InteractionsConfirmSelection from './screens/Interactions/InteractionsConfirmSelection';
import InteractionsAddTTS from './screens/Interactions/InteractionsAddTTS';
import InteractionsTTS from './screens/Interactions/InteractionsTTS';
import InteractionsCheckout from './screens/Interactions/InteractionsCheckout';
import InteractionsMemeSelector from './screens/Interactions/InteractionsMemeSelector';
import BuyQoins from './screens/BuyQoins/BuyQoins';
import InteractionsSent from './screens/Interactions/InteractionsSent';
import InteractionsAddVisual from './screens/Interactions/InteractionsAddVisual';
import PrepaidInteractionsPersonalize from './screens/Interactions/PrepaidReactions/PrepaidInteractionsPersonalize';
import PrepaidInteractionsGiphyMediaSelector from './screens/Interactions/PrepaidReactions/PrepaidInteractionsGiphyMediaSelector';
import PrepaidInteractionsMemeSelector from './screens/Interactions/PrepaidReactions/PrepaidInteractionsMemeSelector';
import PrepaidInteractionsConfirmSelection from './screens/Interactions/PrepaidReactions/PrepaidInteractionsConfirmSelection';
import PrepaidInteractionsAddTTS from './screens/Interactions/PrepaidReactions/PrepaidInteractionsAddTTS';
import PrepaidInteractionsTTS from './screens/Interactions/PrepaidReactions/PrepaidInteractionsTTS';
import PrepaidInteractionsAddVisual from './screens/Interactions/PrepaidReactions/PrepaidInteractionsAddVisual';
import PrepaidInteractionsCheckout from './screens/Interactions/PrepaidReactions/PrepaidInteractionsCheckout';
import PrepaidInteractionsSent from './screens/Interactions/PrepaidReactions/PrepaidInteractionsSent';

//#region Stack Navigators

const SettingsMenuStackNavigator = createStackNavigator({
  AppSettingsMenu: {
    screen: AppSettingsMenuScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions close {...props} />
    },
  },
  Support: {
    screen: SupportScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions back close {...props} />
    },
  },
  NotificationsSettings: {
    screen: NotificationsSettingsScreen,
    navigationOptions: {
      header: (props) => <TopNavOptions back close {...props} />
    },
  },
});

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

const InteractionsStackNavigator = createStackNavigator({
  InteractionsFeed: {
    screen: InteractionsFeed,
    navigationOptions: {
      headerShown: false,
      animationEnabled: false,
    },
  },
  InteractionsSearchStreamer: {
    screen: InteractionsSearchStreamer,
    navigationOptions: {
      headerShown: false,
      // animationEnabled:false,
    },
  },
});

const InteractionsPersonlizeStackNavigator = createStackNavigator({
  InteractionsPersonalize: {
    screen: InteractionsPersonalize,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsGiphyMediaSelector: {
    screen: InteractionsGiphyMediaSelector,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsMemeSelector: {
    screen: InteractionsMemeSelector,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsConfirmSelection: {
    screen: InteractionsConfirmSelection,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsAddTTS: {
    screen: InteractionsAddTTS,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsTTS: {
    screen: InteractionsTTS,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsAddVisual: {
    screen: InteractionsAddVisual,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsCheckout: {
    screen: InteractionsCheckout,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  InteractionsSent: {
    screen: InteractionsSent,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
}, {
  defaultNavigationOptions: {
    header: (props) => <PersonalizeInteractionHeader {...props} />,
  }
});
const PrepaidInteractionsPersonlizeStackNavigator = createStackNavigator({
  PrepaidInteractionsPersonalize: {
    screen: PrepaidInteractionsPersonalize,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsGiphyMediaSelector: {
    screen: PrepaidInteractionsGiphyMediaSelector,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsMemeSelector: {
    screen: PrepaidInteractionsMemeSelector,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsConfirmSelection: {
    screen: PrepaidInteractionsConfirmSelection,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsAddTTS: {
    screen: PrepaidInteractionsAddTTS,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsTTS: {
    screen: PrepaidInteractionsTTS,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsAddVisual: {
    screen: PrepaidInteractionsAddVisual,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsCheckout: {
    screen: PrepaidInteractionsCheckout,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
  PrepaidInteractionsSent: {
    screen: PrepaidInteractionsSent,
    navigationOptions: {
      headerShown: true,
      gestureDirection: 'horizontal',
      ...TransitionPresets.SlideFromRightIOS,
    },
  },
}, {
  defaultNavigationOptions: {
    header: (props) => <PersonalizeInteractionHeader {...props} />,
  }
});

//#endregion

//#region Top Tab Navigators

const StreamsTopTabNavigator = createMaterialTopTabNavigator(
  {
    Timeline: {
      screen: TimelineStreams
    },
    MyStreams: {
      screen: MyStreamsScreen
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
      screen: DiscoverStreamersScreen
    },
    Following: {
      screen: FollowingStreamersScreen
    },
  },
  {
    initialRouteName: 'Discover',
    lazy: true,
    tabBarComponent: (props) => <QaplaTabBar {...props} />
  },
);

//#endregion

//#region Bottom Tab Navigator

const MainBottomTabNavigator = createBottomTabNavigator({
  Explore: {
    screen: StreamsTopTabNavigator,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1 }],
          justifyContent: 'center',
          marginTop: 15,
          marginLeft: -2,
        }}>
          <Svg width="30px" height="30px" viewBox="0 0 30 33">
            <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Profile" transform="translate(-48.000000, -744.000000)">
                <G id="Bottom-Nav-Bar" transform="translate(0.000000, 731.000000)">
                  <G id="Events" transform="translate(0.000000, 12.000000)">
                    <G id="controller-play" transform="translate(48.000000, 0.000000)">
                      <G id="Controller" transform="translate(0.000000, 6.250000)">
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
      tabBarLabel: ({ tintColor, focused }) => (
        <View style={{
          display: 'flex',
          height: 20,
          marginBottom: 10,
          justifyContent: 'center'
        }} >
          <QaplaText style={{
            color: tintColor,
            fontSize: 9,
            fontWeight: '500',
            lineHeight: 11,
            letterSpacing: 0.5,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
            {translate('router.bottomNavigators.mainNavigator.explore')}
          </QaplaText>
        </View>
      ),
    },
  },
  Ranking: {
    screen: DonationsLeaderBoard,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1 }],
          justifyContent: 'center',
          marginTop: 15,
          marginLeft: 0,
        }}>
          <Svg width="27.5px" height="25px" viewBox="0 0 27.5 26">
            <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Community" transform="translate(-127.000000, -746.000000)">
                <G id="Bottom-Nav-Bar" transform="translate(0.000000, 727.000000)">
                  <G id="Community" transform="translate(94.000000, 17.000000)">
                    <G id="Ranking" transform="translate(32.000000, 0.000000)">
                      <G id="Column-01-Up" transform="translate(1.250000, 2.500000)">
                        <Rect fill={focused ? tintColor : '#FFF'} x="10" y="0" width="7.5" height="25" rx="2.5" />
                        <Rect fill={focused ? '#4040FF' : '#4E5166'} x="0" y="5" width="7.5" height="20" rx="2.5" />
                        <Rect fill={focused ? '#4040FF' : '#4E5166'} x="20" y="10" width="7.5" height="15" rx="2.5" />
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        </View>
      ),
      tabBarLabel: ({ tintColor, focused }) => (
        <View style={{
          display: 'flex',
          height: 20,
          marginBottom: 10,
          justifyContent: 'center'
        }} >
          <QaplaText style={{
            color: tintColor,
            fontSize: 9,
            fontWeight: '500',
            lineHeight: 11,
            letterSpacing: 0.5,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
            Ranking
          </QaplaText>
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
          display: 'flex',
          marginTop: -6,
          paddingTop: 2,
          transform: [{ scale: 1 }],
          // shadowColor: "#fff",
          // shadowOffset: { height: 60, width: 60 },
          // elevation: 20
        }}>
          <images.svg.interactionsIcon />
        </View>
      ),
      tabBarLabel: () => (
        <></>
      ),
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        navigation.navigate('InteractionsStack');
      },
    },
  },
  Community: {
    screen: CommunityTopTabNavigator,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1.1 }],
          justifyContent: 'center',
          marginTop: 17.5,
          marginLeft: 0,
        }}>
          <Svg width="25px" height="24.69px" viewBox="0 0 25 26">
            <G id="UI" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Profile" transform="translate(-175.000000, -745.000000)">
                <G id="Bottom-Nav-Bar" transform="translate(0.000000, 731.000000)">
                  <G id="Community" transform="translate(125.000000, 12.000000)">
                    <G id="chat" transform="translate(48.000000, 0.000000)">
                      <G id="Comment" transform="translate(2.500000, 2.500000)">
                        <Path fill={tintColor} d="M4.99346 1.11165C2.8809 1.4331 1.20706 2.9811 0.844325 5.08696C0.591513 6.55465 0.375 8.41906 0.375 10.5C0.375 12.5809 0.591513 14.4454 0.844325 15.913C1.1557 17.7207 2.4332 19.1174 4.125 19.68V23.9345C4.125 24.9024 5.17764 25.503 6.01091 25.0106L13.6551 20.4936C16.423 20.4482 18.9048 20.1701 20.7565 19.8884C22.8691 19.5669 24.543 18.0189 24.9056 15.913C25.1585 14.4454 25.375 12.5809 25.375 10.5C25.375 8.41906 25.1585 6.55465 24.9056 5.08696C24.543 2.9811 22.8691 1.4331 20.7565 1.11165C18.7324 0.803662 15.9555 0.5 12.875 0.5C9.79449 0.5 7.01764 0.803662 4.99346 1.11165Z" id="Path" />
                        <Path fill={focused ? '#4040FF' : '#FFF'} d="M19.7069 9.47228C19.0348 9.05106 18.1434 9.24615 17.7158 9.90813C17.698 9.93555 15.9031 12.6592 12.875 12.6592C9.84694 12.6592 8.05202 9.93555 8.03421 9.90813C7.60658 9.24622 6.71518 9.05113 6.04315 9.47228C5.37112 9.8935 5.17302 10.7715 5.60066 11.4332C5.70796 11.5992 8.28127 15.5 12.875 15.5C17.4687 15.5 20.042 11.5993 20.1493 11.4332C20.577 10.7713 20.3789 9.8935 19.7069 9.47228Z" id="Shape" />
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        </View>
      ),
      tabBarLabel: ({ tintColor, focused }) => (
        <View style={{
          display: 'flex',
          height: 20,
          marginBottom: 10,
          justifyContent: 'center',
        }} >
          <QaplaText style={{
            color: tintColor,
            fontSize: 9,
            fontWeight: '500',
            lineHeight: 11,
            letterSpacing: 0.5,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
            {translate('router.bottomNavigators.mainNavigator.community')}
          </QaplaText>
        </View>
      ),
    },
  },
  Profile: {
    screen: UserProfileScreen,
    navigationOptions: {
      tabBarButtonComponent: TouchableOpacity,
      tabBarIcon: ({ tintColor, focused }) => (
        <View style={{
          transform: [{ scale: 1.2 }],
          justifyContent: 'center',
          marginTop: 16.25,
          marginLeft: 5,
        }}>
          <Svg width="22.5px" height="27.5px" viewBox="0 0 30 30">
            <G id="UI" stroke="none" stroke-width="1" fill-rule="evenodd">
              <G id="Events-(Waiting-Aproval)" transform="translate(-301.000000, -744.000000)">
                <G id="Bottom-Nav-Bar" transform="translate(0.000000, 732.000000)">
                  <G id="Profile" transform="translate(250.000000, 11.000000)">
                    <G id="user-profile" transform="translate(48.000000, 0.000000)">
                      <G id="User" transform="translate(3.750000, 1.250000)">
                        <Path fill={focused ? tintColor : '#FFF'} d="M18.125 6.5C18.125 9.95177 15.3267 12.75 11.875 12.75C8.42322 12.75 5.625 9.95177 5.625 6.5C5.625 3.04822 8.42322 0.25 11.875 0.25C15.3267 0.25 18.125 3.04822 18.125 6.5Z" id="Path" fill-rule="nonzero" />
                        <Path fill={focused ? '#3B4BF9' : tintColor} d="M20.3975 16.656C19.627 15.7626 18.3035 15.8086 17.2686 16.3751C15.6673 17.2516 13.8294 17.75 11.875 17.75C9.92062 17.75 8.08273 17.2516 6.48131 16.3751C5.44646 15.8086 4.12301 15.7626 3.3525 16.656C1.65277 18.6267 0.625 21.1934 0.625 24V25.25C0.625 26.6306 1.74429 27.75 3.125 27.75H20.625C22.0058 27.75 23.125 26.6306 23.125 25.25V24C23.125 21.1934 22.0972 18.6267 20.3975 16.656Z" id="Path" />
                      </G>
                    </G>
                  </G>
                </G>
              </G>
            </G>
          </Svg>
        </View>
      ),
      tabBarLabel: ({ tintColor, focused }) => (
        <View style={{
          display: 'flex',
          height: 20,
          marginBottom: 10,
          justifyContent: 'center',
        }} >
          <QaplaText style={{
            color: tintColor,
            fontSize: 9,
            fontWeight: '500',
            lineHeight: 11,
            letterSpacing: 0.5,
            textAlign: 'center',
            textAlignVertical: 'center',
          }}>
            {translate('router.bottomNavigators.mainNavigator.profile')}
          </QaplaText>
        </View>

      ),
    }
  }
}, {
  tabBarOptions: {
    style: {
      backgroundColor: '#0C1021',
      position: 'absolute',
      padding: 0,
      height: BOTTOM_NAVIGATION_BAR_HEIGHT,
      margin: 0,
      borderTopColor: 'transparent',
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    showLabel: true,
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

//#region Root Stack Navigator

const RootStackNavigator = createStackNavigator({
  MainBottomNavigator: {
    screen: MainBottomTabNavigator,
    navigationOptions: {
      header: (props) => <HeaderBar {...props} />
    },
  },
  Activity: {
    screen: ActivityScreen,
    navigationOptions: {
      headerShown: false,
    },
  },
  StreamerProfile: {
    screen: StreamerProfileStackNavigator,
    navigationOptions: {
      animationEnabled: false,
    },
  },
  SettingsMenu: SettingsMenuStackNavigator,
  Auth: AuthStackNavigator,
  InteractionsStack: InteractionsStackNavigator,
  InteractionsPersonlizeStack: {
    screen: InteractionsPersonlizeStackNavigator,
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
  }
});

//#endregion

//#region Switch Navigator

const MainSwitchNavigator = createSwitchNavigator({
  SplashScreen: AuthLoadingScreen,
  App: RootStackNavigator,
  onBoarding: WelcomeOnboardingScreen,
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
