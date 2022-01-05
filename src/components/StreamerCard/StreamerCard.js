import React, { Component } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import styles from './style';
import Images from '../../../assets/images';
import QaplaChip from '../QaplaChip/QaplaChip';

const FounderBadge = Images.svg.founderBadge;

class StreamerCard extends Component {
    state = {
        viewMore: false
    };

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
                <Text style={styles.bio} numberOfLines={3} ellipsizeMode='tail'>
                    {this.props.bio && this.props.bio.length > 90 && !this.state.viewMore ?
                        <>
                            {this.props.bio.slice(0, -this.props.bio.length + 90) + '...'}
                            <Text style={styles.viewMore}>
                                Ver más
                            </Text>
                        </>
                        :
                        this.props.bio
                    }
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