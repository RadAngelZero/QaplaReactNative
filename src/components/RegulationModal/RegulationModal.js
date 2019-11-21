// diego          - 13-11-2019 - us148 - File creation

import React, { Component } from 'react';
import { Modal, View, SafeAreaView, TouchableWithoutFeedback, Text, TextInput, FlatList, ScrollView } from 'react-native';

import styles from './style';
import Images from './../../../assets/images';
import { getQaplaAppRegulation } from '../../services/database';
import { withNavigationFocus } from 'react-navigation';
import TopNavOptions from '../TopNavOptions/TopNavOptions';

const CloseIcon = Images.svg.closeIcon;

class RegulationModal extends Component {
    state = {
        regulationText: []
    };

    componentDidUpdate(prevProps) {
        if ((prevProps.open === false) && this.props.open) {
            this.loadRegulation();
        }
    }

    loadRegulation = async () => {
        const reg = await getQaplaAppRegulation();
        console.log("miau");
        this.setState({
            regulationText: reg
        })
    }

    printRegulationLines() {
        //console.log("regulation: " + JSON.stringify(this.state.regulationText, null, 2));
            
                {this.state.regulationText.map((item) => (
                   <Text style={{color: 'white'}}>{item}</Text>) 
                )}

    }

    /**
     * Clean the local state and then close the modal
     */
    closeModal = () => {
        this.setState({ 
            regulationText: []
        });

        this.props.onClose();
    }

    render() {
        return (
            <Modal
                animationType='fade'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <SafeAreaView style={styles.sfvContainer}>
                    <View style={styles.mainContainer}>
                        <View style={styles.container}> 
                            <TouchableWithoutFeedback onPress={this.closeModal}>
                                <View style={styles.closeIcon}>
                                    <CloseIcon />
                                </View>
                            </TouchableWithoutFeedback>
                            <Text style={styles.modalTitle}>Reglamento</Text>
                            <View style={styles.textContainer}>
                            <ScrollView>
                                {this.state.regulationText.map((item, index) => (
                                      <Text style={{color: 'white'}}>{item}</Text>) 
                                )}
                            </ScrollView>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Modal>
        );
    }
}

export default withNavigationFocus(RegulationModal);
