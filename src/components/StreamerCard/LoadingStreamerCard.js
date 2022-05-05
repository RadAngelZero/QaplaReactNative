import React from 'react';
import { Image, Text, View } from 'react-native';

import styles from './style';
import images from '../../../assets/images';
import { translate } from '../../utilities/i18';

class LoadingStreamerCard extends React.PureComponent {
    render() {
        return (
            <View style={styles.loadingCard}>
                <Image style={{ width: 150, height: 150 }} source={images.gif.loadingStreamers.img} />
                <Text style={styles.loadingText}>
                    {translate('loadingStreamerCard.loading')}
                </Text>
            </View>
        );
    }
}

export default LoadingStreamerCard;