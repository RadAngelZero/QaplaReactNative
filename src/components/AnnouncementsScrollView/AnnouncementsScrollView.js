// josep.sanahuja    - 18-10-2019 - us140 - File creation

import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import styles from './style';
import AnnouncementCard from '../AnnouncementCard/AnnouncementCard';
import { getAnnouncements } from '../../services/database';
import { getLocaleLanguage } from './../../utilities/i18';

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
        const announcements = await getAnnouncements();
        this.setState({
            announcements
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal style={styles.scrollViewStyle} showsHorizontalScrollIndicator={false}>
                    {this.state.announcements.map((ancmnt, index) => (
                        <AnnouncementCard
                            key={`Announcement-${index}`}
                            photoUrl={ancmnt.photoUrl}
                            description={ancmnt.descriptions[getLocaleLanguage()]}
                        />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default AnnouncementsScrollView;
