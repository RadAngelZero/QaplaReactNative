// josep.sanahuja    - 13-11-2019 - us147  - goToLogrosScreen -> goToPopScreen
// josep.sanahuja    - 04-10-2019 - usXXX  - File creation

import React, {Component}from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Text,
  Keyboard
} from 'react-native'
import styles from './style'
import { connect } from 'react-redux';

import { sendUserFeedback } from '../../services/database';

import OneTxtOneBttnModal from '../../components/OneTxtOneBttnModal/OneTxtOneBttnModal';
import { translate } from '../../utilities/i18';

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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.sfvContainer}>
                    <View style={styles.container}>
                        <TextInput
                                style={styles.textInput}
                                placeholder={translate('supportScreen.placeholder')}
                                placeholderTextColor='#898A97'
                                onChangeText={(text) => this.setState({text})}
                                multiline
                                clearTextOnFocus={true}
                                placeholderTextColor={'#FFFF'}
                                value={this.state.text} />
                            <TouchableWithoutFeedback onPress={this.sendFeedback}>
                                <View style={styles.sendButtonContainer}>
                                    <Text style={styles.textStyle}>{translate('supportScreen.send')}</Text>
                                </View>
                        </TouchableWithoutFeedback>
                    </View>
                <OneTxtOneBttnModal
                        visible={ this.state.openModal }
                        onClose={ this.gotoPreviousScreen }
                        header={translate('supportScreen.gratitudeModal.header')}
                        textButton={'OK'} />
            </SafeAreaView>
        </TouchableWithoutFeedback>

      );
  }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
    };
}

export default connect(mapStateToProps)(SupportScreen);
