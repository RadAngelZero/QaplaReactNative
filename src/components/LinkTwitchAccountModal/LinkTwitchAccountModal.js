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
import { translate } from '../../utilities/i18';

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

    onSkipTwitchLink = () => {
        if (this.props.onSkipTwitchLink) {
            this.props.onSkipTwitchLink();
        }

        this.setState({ showDontLinkWarning: false });

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
                                <TouchableOpacity style={styles.skipButtonContainer}
                                    onPress={() => this.setState({ showDontLinkWarning: true })}>
                                    <Text style={styles.skipButtonText}>
                                        {translate('linkTwitchAccount.skip')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <LinkTwitchAccount onLinkSuccessful={this.onLinkSuccessful} />
                        </>
                    }
                    {this.state.showDontLinkWarning &&
                        <>
                            <View style={styles.backButtonContainer}>
                                <QaplaIcon
                                    touchableStyle={styles.closeIcon}
                                    onPress={() => this.setState({ showDontLinkWarning: false })}>
                                    <images.svg.leftArrowThiccIcon />
                                </QaplaIcon>
                            </View>
                            <SkipLinkTwitchAccount onSkipTwitchLink={this.onSkipTwitchLink} />
                        </>
                    }
                </View>
            </Modal >
        );
    }
}

export default LinkTwitchAccountModal;
