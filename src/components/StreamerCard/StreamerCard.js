import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import QaplaChip from '../QaplaChip/QaplaChip';
import { translate } from '../../utilities/i18';

const FounderBadge = Images.svg.founderBadge;
const MAX_BIO_LINES = 3;

class StreamerCard extends Component {
    state = {
        viewMore: false,
        bio: this.props.bio
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
                    shortBio.push(<Text style={styles.viewMore}>
                        {translate('streamerCard.viewMore')}
                    </Text>);

                    this.setState({ bio: shortBio });
                }
            }
        }
    }

    render() {
        return (
            <TouchableOpacity style={styles.card}
                onPress={this.props.onPress}>
                <Image style={styles.coverImage}
                    source={this.props.backgroundUrl ? { uri: this.props.backgroundUrl } : null} />
                <Image style={styles.streamerImage}
                    source={ this.props.photoUrl ? { uri: this.props.photoUrl } : null} />
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
                <Text style={styles.bio} onLayout={(e) => console.log(e.nativeEvent)} onTextLayout={this.onBioLayout} ellipsizeMode='tail'>
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