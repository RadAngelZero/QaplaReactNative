import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import Images from '../../../assets/images';
import QaplaChip from '../QaplaChip/QaplaChip';
import { getStreamerProfilePhotoUrl } from '../../services/storage';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

const FounderBadge = Images.svg.founderBadge;

class StreamerCard extends React.PureComponent {
    state = {
        viewMore: false,
        bio: this.props.bio,
        imageUrl: this.props.photoUrl
    };

    getFallbackImage = async () => {
        try {
            this.setState({ imageUrl: await getStreamerProfilePhotoUrl(this.props.streamerId) });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.card, {
                height: this.props.horizontal ? 396 : 'auto',
                width: this.props.horizontal ? 342 : '100%',
            }]}
                onPress={this.props.onPress}>
                {this.props.backgroundUrl ?
                    <Image style={styles.coverImage}
                        source={{ uri: this.props.backgroundUrl }} />
                    :
                    <LinearGradient style={styles.coverImage}
                        useAngle
                        angle={this.props.backgroundGradient.angle}
                        colors={this.props.backgroundGradient.colors} />
                }
                <Image style={styles.streamerImage}
                    source={this.state.imageUrl ? { uri: this.state.imageUrl } : null}
                    onError={this.getFallbackImage} />
                <View style={styles.streamerNameContainer}>
                    <Text style={styles.streamerName}>
                        {this.props.displayName}
                    </Text>
                    <View>
                        {this.props.badge &&
                            <FounderBadge />
                        }
                    </View>
                </View>
                <Text style={styles.bio} numberOfLines={3} ellipsizeMode='tail'>
                    {this.state.bio}
                </Text>
                <View style={styles.tagsContainer}>
                    {this.props.tags && this.props.tags.map(tag => (
                        <QaplaChip style={styles.tags} textStyle={styles.tagText}>
                            {tag}
                        </QaplaChip>
                    ))
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

export default StreamerCard;