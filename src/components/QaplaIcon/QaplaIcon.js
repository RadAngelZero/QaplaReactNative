import React from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './style';

const QaplaIcon = ({ onPress, children, touchableStyle = {}, disabled = false }) => (
    <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[styles.iconContainer, touchableStyle]}>
        {children}
    </TouchableOpacity>
);

export default QaplaIcon;
