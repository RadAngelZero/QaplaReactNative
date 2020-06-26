import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from './style';

class QaplaText extends Component {
    render() {
        return (
            <Text
                {...this.props}
                style={[styles.qaplaBaseText, this.props.style]}>
                {this.props.children}
            </Text>
        );
    }
}

export default QaplaText;
