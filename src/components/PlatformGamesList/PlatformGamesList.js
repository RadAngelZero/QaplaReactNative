import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';
import images from '../../../assets/images';
import GameCard from '../GameCard/GameCard';

const platformResources = {
    pc: {
        platformColor: '#6D7DDE',
        backgroundColor: '#7726C6',
        name: 'Móvil / PC'
    },
    xbox: {
        platformColor: '#119910',
        backgroundColor: '#42B85E',
        name: 'Xbox One'
    },
    ps4: {
        platformColor: '#0053CC',
        backgroundColor: '#1A52CF',
        name: 'PS4'
    },
    switch: {
        platformColor: '#CC003A',
        backgroundColor: '#FF1658',
        name: 'Switch'
    }
};

const gamesResources = {
    Fifa17: {
        image: {
            ps4: images.png.fifaPsImg.img,
            xbox: images.png.fifaXboxImg.img
        },
        Icon: images.svg.fifaIcon,
        name: 'FIFA 19',
        fullImage: true
    },
    ClashRoyale: {
        image: {
            pc: images.png.peekaImg.img
        },
        Icon: images.svg.clashIcon,
        name: 'Clash Royale',
        fullImage: false
    },
    GearsofWar: {
        image: {
            xbox: images.png.GOW4Xbox.img
        },
        Icon: images.svg.gowIcon,
        name: 'Gears of War 4',
        fullImage: true
    },
    Halo: {
        image: {
            xbox: images.png.HALO5Xbox.img,
        },
        Icon: images.svg.clashIcon,
        name: 'Halo 5',
        fullImage: true
    },
    Hearthstone: {
        image: {
            pc: images.png.heartstoneImg.img,
        },
        Icon: images.svg.heartstoneIcon,
        name: 'Hearthstone',
        fullImage: true
    },
    Overwatch: {
        image: {
            ps4: images.png.overwatchPsImg.img,
            pc: images.png.overwatchPcImg.img,
            xbox: images.png.overwatchXboxImg.img
        },
        Icon: images.svg.overwatchIcon,
        name: 'Overwatch',
        fullImage: true
    },
    LOL: {
        image: {
            pc: images.png.lolImg.img
        },
        Icon: images.svg.lolIcon,
        name: 'League of legends',
        fullImage: true
    },
    Smashbrothers: {
        image: {
            switch: images.png.smashImg.img
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
                    {Object.keys(this.props.listOfGames).map((game) => (
                        <GameCard key={game}
                            game={gamesResources[(this.props.listOfGames[game].name).replace(/ +/g, "")]}
                            platform={this.props.platform}
                            backgroundColor={platformResources[this.props.platform].backgroundColor} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

export default PlatformGamesList;
