import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, Image, Keyboard, Modal, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { translate } from '../../utilities/i18';

import styles from './style';

import images from '../../../assets/images';
import { ScrollView } from 'react-native-gesture-handler';

import Chip from '../../components/Chip/Chip';

class AddTags extends Component {

    state = {
        keyboardHeight: 0,
        imagePath: 'https://media.giphy.com/media/vapO47YjBqpqAdNoAl/giphy.gif',
        aspectRatio: 0,
        keyboardOpen: false,
        tagInput: '',
        suggestTags: [
            {
                title: 'Test1',
            },
            {
                title: 'Test2',
            },
            {
                title: 'Test3',
            },
        ],
        tags: [],
        uploadingModalOpen: false,
        uploadStatusModalOpen: false,
        uploadStatus: 0,
    }

    componentDidMount() {
        Image.getSize(this.state.imagePath, (width, height) => {
            this.setState({ aspectRatio: width / height });
        });

        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                this.setState({ keyboardOpen: true, keyboardHeight: e.endCoordinates.height });
                setTimeout(() => {
                    this.scrollModal.scrollTo({ x: 0, y: this.state.keyboardHeight / 2, animated: true });
                }, 10);
            },
        );
        this.keyboardDidHideSubscription = Keyboard.addListener(
            'keyboardDidHide',
            (e) => {
                this.setState({ keyboardOpen: false, keyboardHeight: this.state.keyboardHeight / 2 });

            },
        );
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

    askForSuggestions = (textInput) => {
        this.fetchTimeout = setTimeout(() => {
            let duplicated = false;
            let suggestionsArr = [{ title: textInput }];
            let fetchedSuggestionsArr = [];
            let newSuggestionsArr = [];
            fetchedSuggestionsArr = [
                {
                    title: 'Test1',
                },
                {
                    title: 'Test2',
                },
                {
                    title: 'Test3',
                },
            ];
            fetchedSuggestionsArr.map((e, index) => {
                if (e.title.toLowerCase() === textInput.toLowerCase()) {
                    duplicated = true;
                    if (index !== 0) {
                        fetchedSuggestionsArr.splice(index, index);
                        fetchedSuggestionsArr.unshift(e);
                    }
                }
            });
            if (!duplicated) {
                newSuggestionsArr = suggestionsArr.concat(fetchedSuggestionsArr);
            } else {
                newSuggestionsArr = fetchedSuggestionsArr;
            }
            this.setState({
                suggestTags: newSuggestionsArr,
            });
        }, 500);
    }

    handleTagInput = (e) => {
        clearTimeout(this.fetchTimeout);
        let newArr = [];
        newArr.unshift({ title: e.nativeEvent.text });
        this.askForSuggestions(e.nativeEvent.text);
        this.setState({ tagInput: e.nativeEvent.text, suggestTags: newArr });
    }

    handleTagPress = (title, index) => {
        if (this.state.tagInput === '') {
            let newTagsArr = [...this.state.tags];
            newTagsArr.splice(index, 1);
            return this.setState({ tags: newTagsArr });;
        }
        let newTagsArr = [...this.state.tags];
        newTagsArr.unshift({ title });
        this.setState({ tags: newTagsArr, suggestTags: [], tagInput: '' });
    }

    uploadHandle = () => {
        this.setState({ uploadingModalOpen: true });
        this.uploadTimeout = setTimeout(() => {
            this.setState({
                uploadStatusModalOpen: true,
                uploadStatus: 0, // 0 = ok | 1 = file size | 2 = rejected | 3 = error
            });
        }, 1000);
    }

    handleCloseButton = () => {
        console.log('close press');
        if (this.state.uploadStatusModalOpen) {
            return this.handleFinalCardButton();
        }
        if (this.state.uploadingModalOpen) {
            console.log('cancel upload');
            clearTimeout(this.uploadTimeout);
            return this.setState({ uploadingModalOpen: false });
        }
        this.props.navigation.navigate('Upload');
    }

    handleFinalCardButton = () => {
        switch (this.state.uploadStatus) {
            case 0:
                return this.props.navigation.navigate('Explore');
            case 1:
            case 2:
                return this.props.navigation.navigate('Upload');
            case 3:
                return this.setState({ uploadingModalOpen: false, uploadStatusModalOpen: false });
        }
    }

    renderChip = ({ item, index }) => (
        <Chip
            title={item.title}
            last={index === (this.state.tagInput === '' ? this.state.tags.length - 1 : this.state.suggestTags.length - 1)}
            active={this.state.tagInput === '' || index === 0}
            onPress={(e) => this.handleTagPress(item.title, index)}
        />
    )

    render() {
        return (
            <View style={styles.modalContainer}>
                <View style={{ flex: 1 }} />
                <View style={styles.addTagModal}>
                    <View style={styles.addTagHeader}>
                        <TouchableOpacity style={styles.closeButtonCompensation} onPress={this.handleCloseButton}>
                            <images.svg.closeIcon />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>
                            {translate('uploadContent.addTags.addTags')}
                        </Text>
                    </View>
                    <ScrollView
                        ref={ref => { this.scrollModal = ref; }}
                        keyboardShouldPersistTaps='handled'
                        style={{}}>
                        <View style={styles.scrollView}>
                            <Image
                                style={{
                                    flex: 1,
                                    aspectRatio: this.state.aspectRatio,
                                }}
                                source={{ uri: this.state.imagePath }}
                                resizeMode='contain'
                            />
                        </View>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                autoFocus
                                placeholder='Type to add tags'
                                placeholderTextColor={'#FFFFFF66'}
                                style={styles.textInput}
                                onChange={this.handleTagInput}
                                value={this.state.tagInput}
                            />
                        </View>
                        <View style={{
                            marginTop: 16,
                        }}>
                            {this.state.tagInput !== '' ?
                                <View>
                                    <View style={styles.tagTextContainer}>
                                        <images.svg.tag />
                                        <Text style={styles.tagText}>
                                            {translate('uploadContent.addTags.suggestions')}
                                        </Text>
                                    </View>
                                    <FlatList
                                        keyboardShouldPersistTaps='handled'
                                        horizontal
                                        data={this.state.suggestTags}
                                        renderItem={this.renderChip}
                                        keyExtractor={item => item.title}
                                        style={styles.chipList}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                                :
                                this.state.tags.length !== 0 ?
                                    <View>
                                        <View style={styles.tagTextContainer}>
                                            <images.svg.tag />
                                            <Text style={styles.tagText}>
                                                {translate('uploadContent.addTags.addedTags')}
                                            </Text>
                                        </View>
                                        <FlatList
                                            keyboardShouldPersistTaps='handled'
                                            horizontal
                                            data={this.state.tags}
                                            renderItem={this.renderChip}
                                            keyExtractor={item => item.title}
                                            style={styles.chipList}
                                            showsHorizontalScrollIndicator={false}
                                        />
                                    </View>
                                    :
                                    <Text style={styles.tipText}>
                                        {translate('uploadContent.addTags.makeEasierP1') + ' '}
                                        <Text style={styles.whiteText}>
                                            {translate('uploadContent.addTags.makeEasierP2')}
                                        </Text>
                                    </Text>
                            }

                        </View>
                        {!this.state.keyboardOpen && this.state.tags.length > 0 &&
                            <TouchableOpacity style={styles.uploadButton} onPress={this.uploadHandle}>
                                <Text style={styles.uploadButtonText}>
                                    {translate('uploadContent.uploadFile')}
                                </Text>
                            </TouchableOpacity>
                        }

                        <View style={{
                            height: this.state.keyboardHeight,
                        }} />
                    </ScrollView>
                </View>
                <Modal
                    visible={this.state.uploadingModalOpen}
                    transparent
                >
                    <View style={styles.finalModalContainer}>
                        <View style={[styles.finalModalCard, {
                            paddingVertical: '25%',
                        }]}>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                            }} onPress={this.handleCloseButton}>
                                <images.svg.closeIcon />
                            </TouchableOpacity>
                            <View style={{
                                transform: [{ scale: 2.2 }],
                            }}>
                                <ActivityIndicator size={'large'} color={'#00FFDD'} />
                            </View>
                            <Text style={[styles.finalCardModalTitle, {
                                marginTop: 68,
                            }]}>
                                    {translate('uploadContent.uploading')}
                            </Text>
                            <Text style={[styles.finalCardModalSubtitle, {
                                marginTop: 8,
                            }]}>
                                    {translate('uploadContent.thisWillTakeSomeTime')}
                            </Text>
                        </View>
                    </View>
                </Modal>
                <Modal
                    visible={this.state.uploadStatusModalOpen}
                    transparent
                >
                    <View style={styles.finalModalContainer}>
                        <View style={[styles.finalModalCard, {
                            paddingBottom: 56,
                        }]}>
                            <TouchableOpacity style={{
                                position: 'absolute',
                                top: 16,
                                right: 16,
                            }} onPress={this.handleCloseButton}>
                                <images.svg.closeIcon />
                            </TouchableOpacity>
                            <View style={{
                                transform: [{ scale: 0.6 }],
                            }}>
                                <Image
                                    source={this.state.uploadStatus === 0 ? images.png.checkCircleGlow.img : images.png.infoCircleGlow.img}
                                />
                            </View>
                            <Text style={[styles.finalCardModalTitle, {
                                marginTop: -56,
                            }]}>
                                {translate('uploadContent.finalCard.title.' + this.state.uploadStatus)}
                            </Text>
                            <Text style={[styles.finalCardModalSubtitle, {
                                marginTop: 16,
                            }]}>
                                {translate('uploadContent.finalCard.subtitle.' + this.state.uploadStatus)}
                            </Text>
                            <TouchableOpacity style={styles.finalCardButton} onPress={this.handleFinalCardButton}>
                                <Text style={styles.finalCardButtonText}>
                                    {translate('uploadContent.finalCard.buttonText.' + this.state.uploadStatus)}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View >
        );
    }

}

export default AddTags;