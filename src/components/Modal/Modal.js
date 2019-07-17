import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class Modal extends Component {
    render() {
        return (
            <>
                {this.props.open ?
                    <>
                        <View style={styles.overlay} />
                        <View style={styles.mainContainer}>
                            <View style={styles.container}>
                                <View style={styles.modalBody}>
                                    <Text style={styles.closeIcon} onPress={this.props.onClose}>X</Text>
                                    {this.props.children}
                                </View>
                            </View>
                        </View>
                    </>
                    :
                    null
                }
            </>
        );
    }
}

export default Modal;
