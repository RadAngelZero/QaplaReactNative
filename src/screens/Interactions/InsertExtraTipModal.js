import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList } from 'react-native';

import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import styles from './style';
import { translate } from '../../utilities/i18';

const symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9, images.svg.closeThiccIcon, 0, images.svg.leftArrowThiccIcon];
const centerSymbols = [2, 5, 8, 0];

class InsertExtraTipModal extends Component {
    state = {
        extraTip: '0'
    };

    setTipAndFinish = () => {
        const extraTipNumber = Number(this.state.extraTip);
        this.props.setExtraTip(extraTipNumber);
        this.props.onClose();
    }

    renderItem = ({ item, index }) => {
        let Component = null;
        if (isNaN(item)) {
            Component = item;
        }

        onSymbolPress = (symbol) => {
            if (!isNaN(symbol)) {
                this.setState({ extraTip: this.state.extraTip === '0' ? symbol.toString() : this.state.extraTip + symbol.toString() });
            } else if (symbol === images.svg.closeThiccIcon) {
                this.setState({ extraTip: '0' });
            } else if (symbol === images.svg.leftArrowThiccIcon) {
                let newValue = this.state.extraTip.substring(0, this.state.extraTip.length - 1);
                newValue = newValue !== '' ? newValue : '0';

                this.setState({ extraTip: newValue });
            }
        }

        const isCenterSymbol = centerSymbols.includes(item);
        return (
            <TouchableOpacity onPress={() => onSymbolPress(item)}
                style={[styles.extraTipKeyboardItemContainer, {
                    backgroundColor: isNaN(item) ? 'transparent' : 'rgba(61, 66, 223, 0.2)',
                    marginLeft: isCenterSymbol ? 55 : 0,
                    marginRight: isCenterSymbol ? 55 : 0
                }]}>
                {isNaN(item) ?
                    <Component />
                    :
                    <Text style={styles.extraTipKeyboardItemText}>
                        {item}
                    </Text>
                }
            </TouchableOpacity>
        );
    }

    render() {
        const extraTipNumber = Number(this.state.extraTip);

        return (
            <Modal visible={this.props.open}
                onRequestClose={this.props.onClose}
                transparent
                animationType='slide'>
                <View style={styles.extraTipModalContainer}>
                    <View style={styles.extraTipModalTipContainer}>
                        {/* We use heightPercentageToPx because we want a circular component */}
                        <images.svg.qoin width={heightPercentageToPx(5)}
                            height={heightPercentageToPx(5)} />
                            <Text style={[styles.extraTipModalTipText]}>
                                {extraTipNumber.toLocaleString()}
                            </Text>
                    </View>
                    <View style={styles.extraTipKeyboardContainer}>
                        <FlatList numColumns={3}
                            data={symbols}
                            columnWrapperStyle={styles.extraTipKeyboardColumnWrapper}
                            contentContainerStyle={styles.extraTipKeyboardContentContainer}
                            renderItem={this.renderItem} />
                    </View>
                    <View>
                        <TouchableOpacity onPress={this.setTipAndFinish}
                            style={[styles.addExtraTipButton, {
                                backgroundColor: extraTipNumber ? '#00FFDD' : '#3D42DF',
                            }]}>
                            <Text style={[styles.addExtraTipButtonText, {
                                color: extraTipNumber ? '#0D1021' : '#FFF',
                            }]}>
                                {extraTipNumber ?
                                    translate('interactions.checkout.extraTipModal.addTip')
                                    :
                                    translate('interactions.checkout.extraTipModal.noTip')
                                }
                            </Text>
                        </TouchableOpacity>
                        {extraTipNumber !== 0 &&
                            <TouchableOpacity onPress={this.props.onClose}>
                                <Text style={styles.cancelExtraTipButtonText}>
                                    {translate('interactions.checkout.extraTipModal.cancel')}
                                </Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </Modal>
        );
    }
}

export default InsertExtraTipModal;