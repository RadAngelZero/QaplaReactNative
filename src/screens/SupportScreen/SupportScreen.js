// josep.sanahuja    - 13-11-2019 - us147  - goToLogrosScreen -> goToPopScreen
// josep.sanahuja    - 04-10-2019 - usXXX  - File creation

import React from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux';

import styles from './style'
import { sendUserFeedback } from '../../services/database';
import OneTxtOneBttnModal from '../../components/OneTxtOneBttnModal/OneTxtOneBttnModal';
import { translate } from '../../utilities/i18';
import QaplaText from '../../components/QaplaText/QaplaText';

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
                                    <QaplaText style={styles.textStyle}>{translate('supportScreen.send')}</QaplaText>
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
