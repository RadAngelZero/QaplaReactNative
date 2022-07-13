import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import styles from './style';
import { heightPercentageToPx } from '../../utilities/iosAndroidDim';
import images from '../../../assets/images';
import RadMasonry from '../../components/RadMasonry/RadMasonry';
import { translate } from '../../utilities/i18';

const GIFsData = [
    {
        id: 'theWok',
        url: 'https://c.tenor.com/IU3SbooHGWkAAAAM/wok-the-wock.gif',
    },
    {
        id: 'onNoCringe',
        url: 'https://c.tenor.com/WarZqLGgTHoAAAAC/oh-no-cringe-cringe.gif',
    },
    {
        id: 'superman',
        url: 'https://media.giphy.com/media/YsTs5ltWtEhnq/giphy.gif',
    },
    {
        id: 'celebration',
        url: 'https://media4.giphy.com/media/BWR7oherCy0EHevd4w/giphy.webp?cid=6220afc6gxwtgcea3jbdsctutceaslmn8tpcaohivtu3gkv9&rid=giphy.webp&ct=g',
    },
    {
        id: 'theWok',
        url: 'https://c.tenor.com/IU3SbooHGWkAAAAM/wok-the-wock.gif',
    },
    {
        id: 'onNoCringe',
        url: 'https://c.tenor.com/WarZqLGgTHoAAAAC/oh-no-cringe-cringe.gif',
    },
    {
        id: 'superman',
        url: 'https://media.giphy.com/media/YsTs5ltWtEhnq/giphy.gif',
    },
    {
        id: 'celebration',
        url: 'https://media4.giphy.com/media/BWR7oherCy0EHevd4w/giphy.webp?cid=6220afc6gxwtgcea3jbdsctutceaslmn8tpcaohivtu3gkv9&rid=giphy.webp&ct=g',
    },
    {
        id: 'theWok',
        url: 'https://c.tenor.com/IU3SbooHGWkAAAAM/wok-the-wock.gif',
    },
    {
        id: 'onNoCringe',
        url: 'https://c.tenor.com/WarZqLGgTHoAAAAC/oh-no-cringe-cringe.gif',
    },
    {
        id: 'superman',
        url: 'https://media.giphy.com/media/YsTs5ltWtEhnq/giphy.gif',
    },
    {
        id: 'celebration',
        url: 'https://media4.giphy.com/media/BWR7oherCy0EHevd4w/giphy.webp?cid=6220afc6gxwtgcea3jbdsctutceaslmn8tpcaohivtu3gkv9&rid=giphy.webp&ct=g',
    },
];


class InteractionsSelectGIF extends Component {

    state = {
        imgSizes: {},
        searchQuery: '',
        selectedID: '',
        keyboardOpen: false,
        gifSection: 1,
    };

    componentDidMount() {
        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                this.setState({ keyboardOpen: true });
            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboardOpen: false });
            },
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

    getImageHeight = (url, index, id) => {
        var newSizes = this.state.imgSizes;
        Image.getSize(url, (width, height) => {
            if (height !== undefined) {
                newSizes[id] = { height, width, fetching: true };
                this.setState({
                    ...this.state,
                    imgSizes: newSizes,
                });
            } else {
                newSizes[id] = { height: 0, width: 0, fetching: true };
                this.setState({
                    ...this.state,
                    imgSizes: newSizes,
                });
            }
        }, (error) => {
            console.log(error.message);
        });
    }

    renderImage = ({ item, i }) => {
        if (this.state.imgSizes[item.id] === undefined) {
            this.getImageHeight(item.url, i, item.id);
            console.log('retry');
            return (<></>);
        }
        const ratio = this.state.imgSizes[item.id].width / this.state.imgSizes[item.id].height;
        return (
            <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('InteractionsConfirmSelection', {
                        itemID: item.id,
                        itemURL: item.url,
                        size: { height: this.state.imgSizes[item.id].height, width: this.state.imgSizes[item.id].width },
                        ratio,
                    });
                }}
                style={styles.gridElementContainer}
            >
                <Image
                    source={{ uri: item.url }}
                    style={[
                        {
                            aspectRatio: ratio,
                        },
                        // this.props.selectedID === item.id ? {
                        //     borderWidth: 5,
                        //     borderColor: '#00FFDD',
                        // } : {},
                    ]}
                    resizeMode="cover"
                />
            </TouchableOpacity>
        );
    };

    searchHandler = (e) => {
        this.setState({ searchQuery: e.nativeEvent.text });
        if (e.nativeEvent.text === '') {
            console.log('No busques');
        }
    }

    onEndReached = (e) => {
        console.log('el fin');
        // console.log(e);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={[styles.gridMainContainer, {
                    height: heightPercentageToPx(this.state.keyboardOpen ? 50.6 : 85),
                }]} >
                    <View style={styles.gridSearchBarContainer}>
                        <View style={[styles.searchBar, styles.gridSearchBar]}>
                            <View style={{ opacity: 0.4 }}>
                                <images.svg.searchStreamerIcon style={styles.searchIcon} />
                            </View>
                            <TextInput
                                value={this.state.searchQuery}
                                onChange={this.searchHandler}
                                style={styles.gridSearchBarTextInput}
                                placeholder={`${translate('interactions.visual.searchOn')} Giphy`}
                                placeholderTextColor={'#fff3'}
                            />
                        </View>
                        <Image source={images.png.PoweredbyGiphy.img} style={styles.gridPoweredbyGiphy} />
                    </View>
                    <View style={styles.gridMasonryContainer}>
                        <RadMasonry
                            data={GIFsData}
                            numColumns={2}
                            renderItem={this.renderImage}
                            onEndReached={this.onEndReached}
                            containerStyle={styles.gridMasonrySubContainer}
                        />
                    </View>
                </View>
                <View style={styles.gridBottomSectionSelector}>
                    <TouchableOpacity
                        onPress={() => this.setState({ ...this.state, searchQuery: '', gifSection: 0 })}
                        style={[styles.gridBottomSelectionSelectorButton, {
                            backgroundColor: !this.state.gifSection ? '#29326B' : '#0000',
                        }]}
                    >
                        <Text style={[styles.gridBottomSelectionSelectorButtonText, {
                            color: !this.state.gifSection ? '#FFFFFF' : '#FFFFFF99',
                        }]}
                        >
                            {translate('interactions.feed.recents')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ ...this.state, searchQuery: '', gifSection: 1 })}
                        style={[styles.gridBottomSelectionSelectorButton, {
                            backgroundColor: this.state.gifSection ? '#29326B' : '#0000',
                        }]}
                    >
                        <Text style={[styles.gridBottomSelectionSelectorButtonText, {
                            color: this.state.gifSection ? '#FFFFFF' : '#FFFFFF99',
                        }]}
                        >
                            {translate('interactions.visual.tabs.trends')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View >
        );
    }
}

export default InteractionsSelectGIF;