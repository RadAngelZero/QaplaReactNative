import React, { Component } from 'react';
import { View } from 'react-native';
import QaplaText from '../QaplaText/QaplaText';

import styles from './style';

class QaplaChip extends Component {
    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <QaplaText numberOfLines={1} style={[styles.text, this.props.textStyle]}>
                    {this.props.children}
                </QaplaText>
            </View>
        );
    }
}

export default QaplaChip;