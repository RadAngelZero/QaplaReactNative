import React from 'react';
import { Image, Text, TouchableOpacity, View, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import styles from './style';
import Images from '../../../assets/images';
import QaplaChip from '../QaplaChip/QaplaChip';
import { translate } from '../../utilities/i18';
import { getStreamerProfilePhotoUrl } from '../../services/storage';

const FounderBadge = Images.svg.founderBadge;
const MAX_BIO_LINES = 3;

class StreamerCard extends React.PureComponent {
    state = {
        viewMore: false,
        bio: this.props.bio,
        imageUrl: this.props.photoUrl
    };

    onBioLayout = (e) => {
        if (this.state.bio === this.props.bio) {
            const lines = e.nativeEvent.lines;
            if (lines.length >= MAX_BIO_LINES) {
                const lastSentenceToRender = lines[MAX_BIO_LINES - 1].text;
                const indexOfLastSentence = this.state.bio.indexOf(lastSentenceToRender) + lastSentenceToRender.length;
                if (indexOfLastSentence !== this.state.bio.length) {
                    let bioString = '';
                    lines.some((textLine, index) => {
                        if (index < MAX_BIO_LINES - 1) {
                            if (index === MAX_BIO_LINES - 2 && lines[index + 1] && lines[index + 1].text === '\n') {
                                if (textLine.text.length > translate('streamerCard.viewMore').length + 3) {
                                    bioString += textLine.text.substring(0, textLine.text.length - translate('streamerCard.viewMore').length + 3).trimEnd() + '...';
                                } else {
                                    bioString += textLine.text.trimEnd() + '...';
                                }

                                return true;
                            } else {
                                bioString += textLine.text;
                            }
                        } else if (index === MAX_BIO_LINES - 1) {
                            if (textLine.text.length > translate('streamerCard.viewMore').length + 3) {
                                bioString += textLine.text.substring(0, textLine.text.length - translate('streamerCard.viewMore').length + 3).trimEnd() + '...';
                            } else {
                                bioString += textLine.text.trimEnd() + '...';
                            }
                        }
                    });

                    let shortBio = [];
                    shortBio.push(bioString);
                    shortBio.push(
                        <Text style={styles.viewMore}>
                            {translate('streamerCard.viewMore')}
                        </Text>
                    );

                    this.setState({ bio: shortBio });
                }
            }
        }
    }

    getFallbackImage = async () => {
        try {
            this.setState({ imageUrl: await getStreamerProfilePhotoUrl(this.props.streamerId) });
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        return (
            <TouchableOpacity style={[styles.card, { height: this.props.horizontal ? '93.4%' : 'auto' }]}
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
                <Text style={styles.bio} onTextLayout={this.onBioLayout} numberOfLines={Platform.OS === 'android' ? 3 : 100} ellipsizeMode='tail'>
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