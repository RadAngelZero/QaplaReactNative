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

import { sendUserFeedback } from '../../services/database';

import OneTxtOneBttnModal from '../../components/OneTxtOneBttnModal/OneTxtOneBttnModal';
import { getPercentWidth, getPercentHeight } from '../../utilities/iosAndroidDim';

class SupportScreen extends React.Component {
  constructor(props) {
      super(props);
  
      this.state = {
          text: '',
          openModal: false
      };
  }

  componentDidMount() {
    console.log('Dimensions height: ' +
        5 + ' : ' + getPercentHeight(5) + '\n' +
        15 + ' : ' + getPercentHeight(15)
        );
    // console.log('Dimensions width: ' +
    //     64 + ' :  ' + getPercentWidth(64) +'\n' +
    //     28 + ' :  ' + getPercentWidth(28) +'\n' +
    //     32 + ' :  ' + getPercentWidth(32) +'\n' +
    //     100 + ' :  ' + getPercentWidth(100)
    //     );
    }

  /**
    * Description:
    * Closes Modal that reminds that a challenge was already sent for a match
    *
    * @param None
    */
  toggleOpenModal = () => {
      this.setState({
        openModal: !this.state.openModal
      });
  } 

  gotoLogrosScreen = () => {
      this.toggleOpenModal();
      this.props.navigation.navigate('Logros');
  }

  sendFeedback = () => {
      sendUserFeedback(this.state.text, this.props.uid);
      this.setState({
          text: ''
      })  
      this.toggleOpenModal();
  }

  render() {
      return (
          <SafeAreaView style={styles.sfvContainer}>
              <View style={styles.container}>
                  <TextInput
                        style={styles.textInput}
                        placeholder='Contento? Frustado? Triste? Compártenos tu opinión aquí ...'
                        placeholderTextColor='#898A97'
                        onChangeText={(text) => this.setState({text})}
                        multiline
                        numberOfLines={200}
                        clearTextOnFocus={true}
                        placeholderTextColor={'#FFFF'}
                        value={this.state.text} />
                    <TouchableWithoutFeedback onPress={this.sendFeedback}>
                        <View style={styles.sendButtonContainer}>
                            <Text style={styles.textStyle}>Envia tu comentario :)</Text>
                        </View>
                  </TouchableWithoutFeedback>
              </View>
              <OneTxtOneBttnModal
                    visible={ this.state.openModal }
                    onClose={ this.gotoLogrosScreen }
                    header={ 'Gracias por tu comentario' }
                    body={ '' }
                    textButton={ 'OK' } />
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
