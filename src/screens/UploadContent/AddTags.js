import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Keyboard, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { translate } from '../../utilities/i18';
import styles from './style';
import images from '../../../assets/images';
import Chip from '../../components/Chip/Chip';
import { uploadMemeToModeration } from '../../services/storage';
import { getModerationKey, saveMemeModerationRequest } from '../../services/database';
import { imageContentModeration } from '../../services/functions';
import { launchImageLibrary } from 'react-native-image-picker';

class AddTags extends Component {
    state = {
        keyboardHeight: 0,
        aspectRatio: 0,
        keyboardOpen: false,
        tagInput: '',
        suggestTags: [],
        tags: [],
        uploadingModalOpen: false,
        uploadStatusModalOpen: false,
        uploadStatus: 0,
        imagePath: '',
        imageWidth: 1,
        imageHeight: 1,
        fileSize: 0
    };

    componentDidMount() {
        this.getImage();

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

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
        this.keyboardDidHideSubscription.remove();
    }

    getImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeExtra: true,
            includeBase64: false
        });

        if (result.assets && result.assets[0]) {
            const selectedMedia = result.assets[0];

            if (selectedMedia.fileSize > 5000000) {
                this.setState({ uploadStatusModalOpen: true, uploadStatus: 1 });
            }

            return this.setState({
                imagePath: selectedMedia.uri,
                imageHeight: selectedMedia.height,
                imageWidth: selectedMedia.width,
            });
        } else {
            this.props.navigation.dismiss();
        }
    }

    askForSuggestions = (textInput) => {
        this.fetchTimeout = setTimeout(async () => {
            try {
                const searchResults = await fetch('https://elastic-qapla-test.es.us-central1.gcp.cloud.es.io/_search', {
                    method: 'POST',
                    body: JSON.stringify({
                        suggest: {
                            suggestions: {
                                text: textInput,
                                completion: {
                                    size: 8,
                                    field: 'suggest'
                                }
                            }
                        }
                    }),
                    headers: {
                        Authorization: 'ApiKey LTcySTdZUUJkWXF3Y2NXZ0o4eUU6QU54aXRWWUlUdkNqdEdKMm5TOHhndw==',
                        'Content-Type': 'application/json'
                    }
                });

                if (searchResults.status === 200) {
                    const searchResult = await searchResults.json();
                    let duplicated = false;
                    const suggestionsArr = [textInput];
                    const fetchedSuggestionsArr = searchResult.suggest.suggestions[0].options.map((tag) => tag.text);
                    let suggestTags = [];

                    fetchedSuggestionsArr.forEach((tag, index) => {
                        if (tag.toLowerCase() === textInput.toLowerCase()) {
                            duplicated = true;
                            if (index !== 0) {
                                fetchedSuggestionsArr.splice(index, 1);
                                fetchedSuggestionsArr.unshift(tag);
                            }
                        }
                    });

                    if (!duplicated) {
                        suggestTags = suggestionsArr.concat(fetchedSuggestionsArr);
                    } else {
                        suggestTags = fetchedSuggestionsArr;
                    }

                    this.setState({ suggestTags });
                } else if (searchResults.status === 401) {
                    console.log('Invalid token');
                }
            } catch (error) {
                console.log(error);
            }
        }, 250);
    }

    handleTagInput = (e) => {
        clearTimeout(this.fetchTimeout);
        let newArr = [];
        newArr.unshift(e.nativeEvent.text);
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
        newTagsArr.unshift(title);
        this.setState({ tags: newTagsArr, suggestTags: [], tagInput: '' });
    }

    uploadHandle = async () => {
        this.setState({ uploadingModalOpen: true });
        try {
            const moderationRequestKey = await getModerationKey();
            const image = await uploadMemeToModeration(moderationRequestKey, this.state.imagePath);

            if (image && image.downloadURL) {
                const imageAnalysisResult = await imageContentModeration(moderationRequestKey, image.downloadURL);
                if (imageAnalysisResult.data && imageAnalysisResult.data.accepted) {
                    let tags = [...this.state.tags];
                    if (imageAnalysisResult.data.tags) {
                        const imageAnalysisResultTags = imageAnalysisResult.data.tags.map((tagObject) => tagObject.description);
                        tags = tags.concat(imageAnalysisResultTags);
                    }

                    await saveMemeModerationRequest(
                        moderationRequestKey,
                        this.props.uid,
                        image.downloadURL,
                        this.state.imageWidth,
                        this.state.imageHeight,
                        'image',
                        tags
                    );

                    this.setState({
                        uploadingModalOpen: false,
                        uploadStatusModalOpen: true,
                        uploadStatus: 0 // 0 = ok | 1 = file size | 2 = rejected | 3 = error
                    });
                } else {
                    this.setState({
                        uploadingModalOpen: false,
                        uploadStatusModalOpen: true,
                        uploadStatus: 2 // 0 = ok | 1 = file size | 2 = rejected | 3 = error
                    });
                }

            } else {
                this.setState({
                    uploadingModalOpen: false,
                    uploadStatusModalOpen: true,
                    uploadStatus: 3 // 0 = ok | 1 = file size | 2 = rejected | 3 = error
                });
            }
        } catch (error) {
            this.setState({
                uploadingModalOpen: false,
                uploadStatusModalOpen: true,
                uploadStatus: 3 // 0 = ok | 1 = file size | 2 = rejected | 3 = error
            });
        }
    }

    handleCloseButton = () => {
        if (this.state.uploadStatusModalOpen) {
            return this.handleFinalCardButton();
        }

        if (this.state.uploadingModalOpen) {

            return this.setState({ uploadingModalOpen: false });
        }

        return this.props.navigation.navigate('Upload');
    }

    handleFinalCardButton = () => {
        this.setState({ uploadingModalOpen: false, uploadStatusModalOpen: false });
        switch (this.state.uploadStatus) {
            case 0:
                return this.props.navigation.navigate('Explore');
            case 1:
            case 2:
                return this.props.navigation.navigate('Upload');
            default:
                break;
        }
    }

    renderChip = ({ item, index }) => (
        <Chip
            title={item}
            last={index === (this.state.tagInput === '' ? this.state.tags.length - 1 : this.state.suggestTags.length - 1)}
            active={this.state.tagInput === '' || index === 0}
            onPress={(e) => this.handleTagPress(item, index)}
        />
    )

    render() {
        return (
            <>
            <SafeAreaView style={styles.modalContainer}>
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
                        keyboardShouldPersistTaps='handled'>
                        <View style={styles.scrollView}>
                            <Image
                                style={{
                                    flex: 1,
                                    aspectRatio: this.state.imageWidth / this.state.imageHeight,
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
                                        keyExtractor={item => item}
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
                                            keyExtractor={item => item}
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
            </SafeAreaView>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#141539' }} />
            </>
        );
    }

}

export default AddTags;