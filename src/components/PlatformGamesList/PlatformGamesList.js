// diego - 10-07-2019 - us22 - Update in the way that load the game name
//Diego - 11-07-2019 - Update platform's names for new references on database

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';
import images from '../../../assets/images';
import GameCard from '../GameCard/GameCard';

const platformResources = {
    pc_white: {
        platformColor: '#6D7DDE',
        backgroundColor: '#7726C6',
        name: 'Móvil / PC'
    },
    xbox_white: {
        platformColor: '#119910',
        backgroundColor: '#42B85E',
        name: 'Xbox One'
    },
    ps4_white: {
        platformColor: '#0053CC',
        backgroundColor: '#1A52CF',
        name: 'PS4'
    },
    switch_white: {
        platformColor: '#CC003A',
        backgroundColor: '#FF1658',
        name: 'Switch'
    }
};

const gamesResources = {
    Fifa17: {
        image: {
            ps4_white: images.png.fifaPsImg.img,
            xbox_white: images.png.fifaXboxImg.img
        },
        Icon: images.svg.fifaIcon,
        name: 'FIFA 19',
        fullImage: true
    },
    ClashRoyale: {
        image: {
            pc_white: images.png.peekaImg.img
        },
        Icon: images.svg.clashIcon,
        name: 'Clash Royale',
        fullImage: false
    },
    GearsofWar: {
        image: {
            xbox_white: images.png.GOW4Xbox.img
        },
        Icon: images.svg.gowIcon,
        name: 'Gears of War 4',
        fullImage: true
    },
    Halo: {
        image: {
            xbox_white: images.png.HALO5Xbox.img,
        },
        Icon: images.svg.haloIcon,
        name: 'Halo 5',
        fullImage: true
    },
    Hearthstone: {
        image: {
            pc_white: images.png.heartstoneImg.img,
        },
        Icon: images.svg.heartstoneIcon,
        name: 'Hearthstone',
        fullImage: true
    },
    Overwatch: {
        image: {
            ps4_white: images.png.overwatchPsImg.img,
            pc_white: images.png.overwatchPcImg.img,
            xbox_white: images.png.overwatchXboxImg.img
        },
        Icon: images.svg.overwatchIcon,
        name: 'Overwatch',
        fullImage: true
    },
    LOL: {
        image: {
            pc_white: images.png.lolImg.img
        },
        Icon: images.svg.lolIcon,
        name: 'League of legends',
        fullImage: true
    },
    Smashbrothers: {
        image: {
            switch_white: images.png.smashImg.img
        },
        Icon: images.svg.smashIcon,
        name: 'Smash Ultimate',
        fullImage: false
    }
}

class PlatformGamesList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{platformResources[this.props.platform].name}</Text><View style={[styles.circleIcon, { backgroundColor: platformResources[this.props.platform].platformColor }]}></View>
                </View>
                <ScrollView horizontal style={styles.scrollViewStyle}>
                    {Object.keys(this.props.listOfGames).map((game) => {
                        //Condition for the existing games on database that actually dont exist
                        //Like counter strike or street fighter
                        if (gamesResources[(this.props.listOfGames[game]).replace(/ +/g, "")]) {
                            return (
                                <GameCard key={game}
                                    game={gamesResources[(this.props.listOfGames[game]).replace(/ +/g, "")]}
                                    platform={this.props.platform}
                                    backgroundColor={platformResources[this.props.platform].backgroundColor} />
                            );
                        }
                        //Something must be returned in this operation, thats why we return
                        //a fragment, that actually dont modify nothing
                        return <React.Fragment key={game}></React.Fragment>
                    })}
                </ScrollView>
            </View>
        );
    }
}

export default PlatformGamesList;
