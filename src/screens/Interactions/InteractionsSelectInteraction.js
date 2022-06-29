import React, { Component } from 'react';
import { Text, FlatList, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import { GIPHY_STICKERS } from '../../utilities/Constants';
import { generateGiphyUserRandomId, getGiphyTrending } from '../../services/Giphy';
import { setUserGiphyId } from '../../services/database';

const MemesData = [
    {
        id: 'bobCholo',
        url: 'https://static.wikia.nocookie.net/memes-pedia/images/c/c3/3bacac4b40b4a76733cc6188b9bdc31b.jpg/revision/latest?cb=20220324222502&path-prefix=es',
    },
    {
        id: 'fry',
        url: 'https://i.blogs.es/d86db0/meme-fry-1/450_1000.jpg',
    },
    {
        id: 'fino',
        url: 'https://static.wikia.nocookie.net/memes-pedia/images/8/86/Fino_Se%C3%B1ores.jpg/revision/latest?cb=20210808084218&path-prefix=es',
    },
    {
        id: 'tuNoTieneAifon',
        url: 'https://i.ytimg.com/vi/WgM4x1lNSsk/maxresdefault.jpg',
    },
    {
        id: 'ohNoCringe',
        url: 'https://i.pinimg.com/280x280_RS/10/44/ff/1044ff6aab1ded3b15271123396367b8.jpg',
    },
    {
        id: 'bobCholo',
        url: 'https://static.wikia.nocookie.net/memes-pedia/images/c/c3/3bacac4b40b4a76733cc6188b9bdc31b.jpg/revision/latest?cb=20220324222502&path-prefix=es',
    },
    {
        id: 'fry',
        url: 'https://i.blogs.es/d86db0/meme-fry-1/450_1000.jpg',
    },
    {
        id: 'fino',
        url: 'https://static.wikia.nocookie.net/memes-pedia/images/8/86/Fino_Se%C3%B1ores.jpg/revision/latest?cb=20210808084218&path-prefix=es',
    },
    {
        id: 'tuNoTieneAifon',
        url: 'https://i.ytimg.com/vi/WgM4x1lNSsk/maxresdefault.jpg',
    },
    {
        id: 'ohNoCringe',
        url: 'https://i.pinimg.com/280x280_RS/10/44/ff/1044ff6aab1ded3b15271123396367b8.jpg',
    },
    {
        id: 'test',
        url: 'https://i.redd.it/031gzvrdjju21.jpg',
    },
];

const GIFsData = [
    {
        id: 'theWok',
        url: 'https://c.tenor.com/IU3SbooHGWkAAAAM/wok-the-wock.gif',
    },
    {
        id: 'onNoCringe',
        url: 'https://c.tenor.com/WarZqLGgTHoAAAAC/oh-no-cringe-cringe.gif',
    }
];

class InteractionsSelectInteraction extends Component {

    state = {
        screen: 2, // 0 = emotes, 1 = GIFs, 2 = memes
        imgSizes: {},
        imgList1: [],
        imgList2: [],
        gifs: [],
        selectedID: '',
    }

    componentDidMount() {
        MemesData.forEach(element => {
            this.getImageHeight(element.url, this.state.imgSizes.length);
        });
    }

    loadGifs = async () => {
        let id = '';
        if (!this.props.giphyId) {
            const randomId = await generateGiphyUserRandomId();
            setUserGiphyId(this.props.uid, randomId);
            id = randomId;
        } else {
            id = this.props.giphyId;
        }

        const gifs = await getGiphyTrending(id, GIPHY_STICKERS, 25);
        this.setState({ gifs });
    }

    loadMoreGifs = async () => {
        const gifs = await getGiphyTrending(this.props.giphyId, GIPHY_GIFS, 25, this.state.gifs.length);
        let gifsList = [...this.state.gifs];
        gifsList = gifsList.concat(gifs);
        this.setState({ gifs: gifsList });
    }

    getImageHeight = (url, index, id) => {
        var newSizes = this.state.imgSizes;
        Image.getSize(url, (width, height) => {
            console.log(index);
            console.log(height);
            console.log(width);
            if (height !== undefined) {
                newSizes[id] = { height, width };
                this.setState({
                    ...this.state,
                    imgSizes: newSizes,
                });
            } else {
            }
        }, (error) => {
            console.log(error.message);
        });
    }

    renderImage = ({ item, index }) => {
        if (this.state.imgSizes[item.id] === undefined) {
            this.getImageHeight(item.url, index, item.id);
            return (<></>);
        }
        const ratio = this.state.imgSizes[item.id].width / this.state.imgSizes[item.id].height;
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    this.setState({
                        ...this.state,
                        selectedID: item.id,
                    });
                    console.log(item.id + ' pressed');
                }}
            >
                <Image
                    source={{ uri: item.url }}
                    style={[
                        {
                            display: 'flex',
                            aspectRatio: ratio,
                            maxWidth: '100%',
                            marginBottom: 4,
                        },
                        this.state.selectedID === item.id ? {
                            borderWidth: 5,
                            borderColor: '#00FFDD',
                        } : {},
                    ]}
                    resizeMode="cover"
                />
            </TouchableWithoutFeedback>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={{
                    display: 'flex',
                    marginTop: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={() => this.setState({ screen: 0 })}
                        >
                            <View style={{
                                paddingVertical: 6,
                                paddingHorizontal: 13,
                                backgroundColor: '#29326B',
                                borderRadius: 6,
                            }}>
                                <Text style={{ color: '#fff' }}>Emotes</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 4 }} />
                        <TouchableOpacity
                            onPress={() => { this.loadGifs(); this.setState({ screen: 1 }); }}
                        >
                            <View style={{
                                paddingVertical: 6,
                                paddingHorizontal: 13,
                                backgroundColor: '#29326B',
                                borderRadius: 6,
                            }}>
                                <Text style={{ color: '#fff' }}>GIFs</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ width: 4 }} />
                        <TouchableOpacity
                            onPress={() => this.setState({ screen: 2 })}
                        >
                            <View style={{
                                paddingVertical: 6,
                                paddingHorizontal: 13,
                                backgroundColor: '#29326B',
                                borderRadius: 6,
                            }}>
                                <Text style={{ color: '#fff' }}>Memes</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        width: '97%',
                    }}>
                        {this.state.screen === 0 &&
                            <>
                                <Text style={{ color: '#fff' }}>Emotes</Text>
                            </>
                        }
                        {this.state.screen === 1 &&
                            <>
                                <Text style={{ color: '#fff' }}>GIFs</Text>
                            </>
                        }
                        {this.state.screen === 2 &&
                            <>
                                <Text style={{ color: '#fff' }}>{this.state.selectedID}</Text>
                                <FlatList
                                    renderItem={null}
                                    keyExtractor={null}
                                    data={null}
                                    ListHeaderComponent={(
                                        <View style={{
                                            display: 'flex',
                                            marginBottom: 50,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}>
                                            <View style={{
                                                width: '48%',
                                                maxWidth: '48%',
                                            }}>
                                                {MemesData &&
                                                    MemesData.map((element, index) => {
                                                        if (!(index % 2)) {
                                                            return (
                                                                <this.renderImage item={element} index={index} key={element.id} />
                                                            );
                                                        }
                                                        return (<></>);
                                                    })
                                                }
                                            </View>
                                            <View style={{
                                                width: '48%',
                                                maxWidth: '48%',
                                            }}>
                                                {MemesData &&
                                                    MemesData.map((element, index) => {
                                                        if (index % 2) {
                                                            return (
                                                                <this.renderImage item={element} index={index} key={element.id} />
                                                            );
                                                        }
                                                        return (<></>);
                                                    })
                                                }
                                            </View>
                                        </View>
                                    )}
                                />
                            </>
                        }
                    </View>
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        giphyId: state.userReducer.user.giphyId
    }
}

export default connect(mapStateToProps)(InteractionsSelectInteraction);
