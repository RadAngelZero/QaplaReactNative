// josep.sanahuja - 15-07-2019 - us25 - added 'gameKey' to GameCard comp props
// diego          - 11-07-2019 - Update platform's names for new references on database
// diego          - 10-07-2019 - us22 - Update in the way that load the game name

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
                    {
                        Object.keys(this.props.listOfGames).map((game) =>{
                            console.log("Miau_1 " + JSON.stringify(game));
                        } )
                    }
                    {Object.keys(this.props.listOfGames).map((game) => {
                        // Condition for the existing games on database that actually dont exist
                        // Like counter strike or street fighter
                        
                        // us24: TODO: The reason and the whereabouts of the replace operation
                        // are not clear and need more clarification 
                        if (gamesResources[(this.props.listOfGames[game]).replace(/ +/g, "")]) {
                            return (
                                <GameCard key={game}
                                    game={gamesResources[(this.props.listOfGames[game]).replace(/ +/g, "")]}
                                    platform={this.props.platform}
                                    backgroundColor={platformResources[this.props.platform].backgroundColor}
                                    gameKey={game} />
                            );
                        }
                        //Something must be returned in this operation, thats why we return
                        //a fragment, that actually dont modify nothing
                        // TODO: Look a way to see if there is a way to avoid having to have
                        // two returns
                        return <React.Fragment key={game}></React.Fragment>
                    })}
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
            ps4_white: Images.png.fifaPsImg.img,
            xbox_white: Images.png.fifaXboxImg.img
        },
        Icon: Images.svg.fifaIcon,
        name: 'FIFA 19',
        fullImage: true
    },
    ClashRoyale: {
        image: {
            pc_white: Images.png.peekaImg.img
        },
        Icon: Images.svg.clashIcon,
        name: 'Clash Royale',
        fullImage: false
    },
    GearsofWar: {
        image: {
            xbox_white: Images.png.GOW4Xbox.img
        },
        Icon: Images.svg.gowIcon,
        name: 'Gears of War 4',
        fullImage: true
    },
    Halo: {
        image: {
            xbox_white: Images.png.HALO5Xbox.img,
        },
        Icon: Images.svg.haloIcon,
        name: 'Halo 5',
        fullImage: true
    },
    Hearthstone: {
        image: {
            pc_white: Images.png.heartstoneImg.img,
        },
        Icon: Images.svg.heartstoneIcon,
        name: 'Hearthstone',
        fullImage: true
    },
    Overwatch: {
        image: {
            ps4_white: Images.png.overwatchPsImg.img,
            pc_white: Images.png.overwatchPcImg.img,
            xbox_white: Images.png.overwatchXboxImg.img
        },
        Icon: Images.svg.overwatchIcon,
        name: 'Overwatch',
        fullImage: true
    },
    LOL: {
        image: {
            pc_white: Images.png.lolImg.img
        },
        Icon: Images.svg.lolIcon,
        name: 'League of legends',
        fullImage: true
    },
    Smashbrothers: {
        image: {
            switch_white: Images.png.smashImg.img
        },
        Icon: Images.svg.smashIcon,
        name: 'Smash Ultimate',
        fullImage: false
    }
};

export default PlatformGamesList;
