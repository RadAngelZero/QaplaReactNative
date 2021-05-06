import React, { Component } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import styles from './style';
import QaplaIcon from '../QaplaIcon/QaplaIcon';
import images from '../../../assets/images';
import LinkTwitchAccount from './LinkTwitchAccount';
import SkipLinkTwitchAccount from './SkipLinkTwitchAccount';

class LinkTwitchAccountModal extends Component {
    state = {
        showDontLinkWarning: false
    };

    onLinkSuccessful = () => {
        if (this.props.onLinkSuccessful) {
            this.props.onLinkSuccessful();
        }

        this.props.onClose();
    }

    render() {
        return (
            <Modal
                animationType='slide'
                transparent={true}
                visible={this.props.open}
                onRequestClose={this.props.onClose}>
                <View style={styles.mainContainer}>
                    {!this.state.showDontLinkWarning &&
                        <>
                            <View style={styles.linkOptions}>
                                <QaplaIcon
                                    touchableStyle={styles.closeIcon}
                                    onPress={this.props.onClose}>
                                    <images.svg.closeThiccIcon />
                                </QaplaIcon>
                                <TouchableOpacity style={styles.skipButtonContainer}
                                    onPress={() => this.setState({ showDontLinkWarning: true })}>
                                    <Text style={styles.skipButtonText}>
                                        Omitir
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <LinkTwitchAccount onLinkSuccessful={this.onLinkSuccessful} />
                        </>
                    }
                    {this.state.showDontLinkWarning &&
                        <>
                            <QaplaIcon
                            touchableStyle={styles.closeIcon}
                            onPress={() => this.setState({ showDontLinkWarning: false })}>
                                <images.svg.leftArrowThiccIcon />
                            </QaplaIcon>
                            <SkipLinkTwitchAccount />
                        </>
                    }
                </View>
            </Modal>
        );
    }
}

export default LinkTwitchAccountModal;
