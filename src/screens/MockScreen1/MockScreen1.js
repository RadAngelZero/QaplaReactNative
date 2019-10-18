// josep.sanahuja    - 22-09-2019 - us123 - Add QGCamera
// josep.sanahuja    - 05-08-2019 - us84  - + SafeAreaView

import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Linking,
  Text
} from 'react-native'
import styles from './style'

export default class MockScreen1 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        cameraVisible: true,
        picture: {uri: "", base64: ""}
        };
    }

    /**
     * Closes QGCamera by closing its modal.
     */
    closeCamera = () => {
        this.setState({
            cameraVisible: false
        });
    }

    /**
     * Closes QGCamera by closing its modal.
     * 
     * @param {object} pict Object representing a picture, with uri and base64 props
     */
    savePicture = (pict) => {
        this.setState({
            picture: {uri: pict.uri, base64: pict.base64}
        });  
    }

    render() {
        return (
            <SafeAreaView style={styles.sfvContainer}>
              <View style={styles.container}>
                  <TouchableWithoutFeedback
                    onPress={() => Linking.openURL('whatsapp://send?text=Hola, quiero retirar mis qaploins&phone=+523312971299'/*<= Change for the suport number */)}>
                      <Text>Retirar mi dinero</Text>
                  </TouchableWithoutFeedback>
              </View>
            </SafeAreaView>
        );
    }
}
