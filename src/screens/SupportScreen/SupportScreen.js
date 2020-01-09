// josep.sanahuja    - 13-11-2019 - us147  - goToLogrosScreen -> goToPopScreen
// josep.sanahuja    - 04-10-2019 - usXXX  - File creation

import React, {Component}from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Text
} from 'react-native'
import styles from './style'
import { connect } from 'react-redux';
import i18n from 'i18n-js';

import { sendUserFeedback } from '../../services/database';

import OneTxtOneBttnModal from '../../components/OneTxtOneBttnModal/OneTxtOneBttnModal';

class SupportScreen extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          text: '',
          openModal: false
      };
  }

  /**
    * @description Toggle modal visibility
    */
  toggleOpenModal = () => {
      this.setState({
        openModal: !this.state.openModal
      });
  }

  gotoPreviousScreen = () => {
      this.toggleOpenModal();
      this.props.navigation.pop();
  }

  sendFeedback = () => {
      sendUserFeedback(this.state.text, this.props.uid);
      this.setState({
          text: ''
      });
      this.toggleOpenModal();
  }

  render() {
      return (
          <SafeAreaView style={styles.sfvContainer}>
              <View style={styles.container}>
                  <TextInput
                        style={styles.textInput}
                        placeholder={i18n.t('supportScreen.placeholder')}
                        placeholderTextColor='#898A97'
                        onChangeText={(text) => this.setState({text})}
                        multiline
                        numberOfLines={200}
                        clearTextOnFocus={true}
                        placeholderTextColor={'#FFFF'}
                        value={this.state.text} />
                    <TouchableWithoutFeedback onPress={this.sendFeedback}>
                        <View style={styles.sendButtonContainer}>
                            <Text style={styles.textStyle}>{i18n.t('supportScreen.send')}</Text>
                        </View>
                  </TouchableWithoutFeedback>
              </View>
              <OneTxtOneBttnModal
                    visible={ this.state.openModal }
                    onClose={ this.gotoPreviousScreen }
                    header={i18n.t('supportScreen.gratitudeModal.header')}
                    textButton={'OK'} />
          </SafeAreaView>
      );
  }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
    };
}

export default connect(mapStateToProps)(SupportScreen);
