// josep.sanahuja  - 18-12-2019 - us176 - Added CloseIcon and resized scrollview items
// josep.sanahuja  - 17-10-2019 - us134 - File creation

import React, { Component } from 'react';
import { SafeAreaView, View, Image, TouchableWithoutFeedback, FlatList, Modal } from 'react-native';

import styles from './style';
import Images from '../../../../assets/images';
import QaplaText from '../../QaplaText/QaplaText';

const Divider = Images.png.divider.img;
const CloseIcon = Images.svg.closeIcon;

export class PhonePrefixPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            countriesList: [],
            countrySelected: {
                "alpha2Code": "MX",
                "name": "México",
                "callingCodes": [
                  "52"
                ]
            },
            showModal: false
        };
    }

    componentDidMount() {
        this.writeCoutryPrefixesToState();
    }

    /**
     * Downloads and writes countries information prefixes into state
     */
    async writeCoutryPrefixesToState() {
        let res = await this.getCountryPrefixes();

        this.setState({
            countriesList: res
        });
    }

    /**
     * Downloads countries prefixes information from 'restcountries.eu'
     */
    async getCountryPrefixes() {
        let res = [];

        try {
            let response = await fetch(
              'https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;callingCodes;'
            ); 
            res = await response.json();
        } catch (error) {
            console.error(error);
        }

        return res;
    }

    /**
     * Saves country prefix information to state and also
     * to the parents. It also closes the modal since
     * a prefix was picked.
     *
     * @param {object} item Country information
     */
    itemSelected = (item) => {
        this.setState({
            countrySelected: item
        });
        this.props.onChangePrefix(item);
        this.closeModal();
    }

    /**
     * Opens the modal to pick a country prefixs
     */
    openModal = () => {
        this.setState({
            showModal: true
        })
    }

    /**
     * Closes the modal to pick a country prefixs
     */
    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    render() {
        return (
            <>     
                <TouchableWithoutFeedback onPress={this.openModal}>     
                        <View style={styles.container}>
                            <QaplaText style={styles.prefixAlphaCode}>{this.state.countrySelected.alpha2Code}</QaplaText>
                            <QaplaText style={styles.prefixNumCode}>+{this.state.countrySelected.callingCodes}</QaplaText> 
                        </View>
                </TouchableWithoutFeedback>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.showModal}
                    >
                        <SafeAreaView style={styles.sfvContainer}>
                            <View style={styles.modalMainContainer}>
                                <TouchableWithoutFeedback onPress={this.closeModal}>
                                    <View style={styles.closeIcon}>
                                        <CloseIcon />
                                    </View>
                                </TouchableWithoutFeedback>
                                <View>
                                    <QaplaText style={styles.title}>Selecciona tu prefijo</QaplaText>
                                    <View style={styles.divider}>
                                        <Image source={Divider} />
                                    </View>
                                </View>
                                <View style={styles.modalContainer}>
                                    <FlatList
                                        windowSize={30}
                                        data={this.state.countriesList}
                                        renderItem={({item}) =>
                                            <TouchableWithoutFeedback onPress={() => this.itemSelected(item)}>
                                                <View style={styles.prefixCardItem}>
                                                    <QaplaText style={styles.prefixCardTxt}>
                                                        +{item.callingCodes[0]}, {item.name}
                                                    </QaplaText> 
                                                </View>
                                            </TouchableWithoutFeedback>
                                        }
                                        keyExtractor={(item) => {item.alpha2code}} /> 
                                </View>
                            </View>
                        </SafeAreaView>
                </Modal>
            </>
        );
    }
}

export default PhonePrefixPicker;
