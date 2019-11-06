// josep.sanahuja    - 18-10-2019 - us140 - File creation

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './style';
import Images from '../../../assets/images';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';
import { getAnnouncements } from '../../services/database';

class AnnouncementsScrollView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            announcements: []
        };
    }

    componentDidMount() {
        this.getlistOfAnnouncements();
    }

    async getlistOfAnnouncements() {
        const res = await getAnnouncements();
        this.setState({
            announcements: res
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal style={styles.scrollViewStyle}>
                    {this.state.announcements.map((ancmnt, index) => (
                        <AnnouncementCard
                            key={`Announcement-${index}`}
                            photoUrl={ancmnt.photoUrl}
                            description={ancmnt.description}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default AnnouncementsScrollView;
