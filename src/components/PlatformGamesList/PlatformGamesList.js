// diego          - 21-08-2019 - us89 - Added loadGamesUserDontHave prop
// josep.sanahuja - 15-07-2019 - us25 - added 'gameKey' to GameCard comp props
// diego          - 11-07-2019 - Update platform's names for new references on database
// diego          - 10-07-2019 - us22 - Update in the way that load the game name
// diego          - 17-07-2019 - NA   - Remove unnecesary code to make more legible and efficient
// diego          - 17-07-2019 - NA   - remove full image field in gamesResources object

import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './style';
import Images from '../../../assets/images';
import GameCard from '../GameCard/GameCard';

class PlatformGamesList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{platformResources[this.props.platform].name}</Text><View style={[styles.circleIcon, { backgroundColor: platformResources[this.props.platform].platformColor }]}></View>
                </View>
                <ScrollView horizontal style={styles.scrollViewStyle}>
                    {Object.keys(this.props.listOfGames).map((game) => (
                        //Remove any game that actually dont exist (like counter strike o street figther) from database
                        //or this component is going to fail
                        <GameCard
                            key={game}
                            // Replace is needed because the key of the game objects in the gamesResources object
                            // are the name of the game but without spaces (replace function remove that spaces)
                            loadGamesUserDontHave={this.props.loadGamesUserDontHave}
                            game={gamesResources[(this.props.listOfGames[game]).replace(/ +/g, "")]}
                            platform={this.props.platform}
                            backgroundColor={platformResources[this.props.platform].backgroundColor}
                            gameKey={game} />
                    ))}
                </ScrollView>
            </View>
        );
    }
}

// TODO: Is this info in the backend? Ideally it should be retrieved from the server and maybe
// cached after first time downloaded
const platformResources = {
    pc_white: {
        platformColor: '#6D7DDE',
        backgroundColor: {
            primary: '#B670E1',
            secondary: '#7726C6'
        },
        name: 'Móvil / PC'
    },
    xbox_white: {
        platformColor: '#119910',
        backgroundColor: {
            primary: '#3DF9DF',
            secondary: '#42B85E'
        },
        name: 'Xbox One'
    },
    ps4_white: {
        platformColor: '#0053CC',
        backgroundColor: {
            primary: '#3DBFF4',
            secondary: '#1A52CF'
        },
        name: 'PS4'
    },
    switch_white: {
        platformColor: '#CC003A',
        backgroundColor: {
            primary: '#FF1658',
            secondary: '#1A52CF'
        },
        name: 'Switch'
    }
};

const gamesResources = {
    Fifa17: {
        image: {
            ps4_white: Images.png.fifaPsImg.img,
            xbox_white: Images.png.fifaXboxImg.img
        },
        Icon: Images.svg.fifaIcon,
        name: 'FIFA 19'
    },
    ClashRoyale: {
        image: {
            pc_white: Images.png.peekaImg.img
        },
        Icon: Images.svg.clashIcon,
        name: 'Clash Royale'
    },
    GearsofWar: {
        image: {
            xbox_white: Images.png.GOW4Xbox.img
        },
        Icon: Images.svg.gowIcon,
        name: 'Gears of War 4'
    },
    Halo: {
        image: {
            xbox_white: Images.png.HALO5Xbox.img,
        },
        Icon: Images.svg.haloIcon,
        name: 'Halo 5'
    },
    Hearthstone: {
        image: {
            pc_white: Images.png.heartstoneImg.img,
        },
        Icon: Images.svg.heartstoneIcon,
        name: 'Hearthstone'
    },
    Overwatch: {
        image: {
            ps4_white: Images.png.overwatchPsImg.img,
            pc_white: Images.png.overwatchPcImg.img,
            xbox_white: Images.png.overwatchXboxImg.img
        },
        Icon: Images.svg.overwatchIcon,
        name: 'Overwatch'
    },
    LOL: {
        image: {
            pc_white: Images.png.lolImg.img
        },
        Icon: Images.svg.lolIcon,
        name: 'League of legends'
    },
    Smashbrothers: {
        image: {
            switch_white: Images.png.smashImg.img
        },
        Icon: Images.svg.smashIcon,
        name: 'Smash Ultimate'
    }
};

export default PlatformGamesList;
