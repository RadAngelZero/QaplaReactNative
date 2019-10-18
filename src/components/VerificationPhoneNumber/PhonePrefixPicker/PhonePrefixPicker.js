// josep.sanahuja  - 17-10-2019 - us134 - File creation

import React, { Component } from 'react';
import { View, Picker, Text, Image, TouchableWithoutFeedback, FlatList, Modal, SafeAreaView} from 'react-native';
import styles from './style';

import Images from '../../../../assets/images';

const Divider = Images.png.divider.img;
const MEXICO_FLAT_LIST_INDEX = 144;

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
                            <Text style={styles.prefixAlphaCode}>{this.state.countrySelected.alpha2Code}</Text>
                            <Text style={styles.prefixNumCode}>+{this.state.countrySelected.callingCodes}</Text> 
                        </View>
                </TouchableWithoutFeedback>
                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.showModal}
                    >
                        <View style={styles.modalMainContainer}>
                            <View>
                                <Text style={styles.title}>Selecciona tu prefijo</Text>
                                <View style={styles.divider}>
                                    <Image source={Divider} />
                                </View>
                            </View>
                            <View style={styles.modalContainer}>
                                <FlatList
                                    windowSize={15}
                                    data={this.state.countriesList}
                                    initialNumToRender={7}
                                    initialScrollIndex={MEXICO_FLAT_LIST_INDEX}
                                    renderItem={({item, index}) =>
                                        <TouchableWithoutFeedback onPress={() => {this.itemSelected(item)}}>
                                            <View style={styles.prefixCardItem}>
                                                <Text style={styles.prefixCardTxt}>
                                                    +{item.callingCodes[0]}, {item.name}
                                                </Text> 
                                            </View>
                                        </TouchableWithoutFeedback>
                                    }
                                    keyExtractor={(item) => {item.alpha2code}} /> 
                            </View>
                        </View>
                        
                </Modal>
            </>
        );
    }
}

export default PhonePrefixPicker;
