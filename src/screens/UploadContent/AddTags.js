import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Keyboard, Modal, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import { connect } from 'react-redux';

import { getLocaleLanguage, translate } from '../../utilities/i18';
import styles from './style';
import images from '../../../assets/images';
import Chip from '../../components/Chip/Chip';
import { uploadMemeToModeration } from '../../services/storage';
import { getModerationKey, saveMemeModerationRequest } from '../../services/database';
import { imageContentModeration } from '../../services/functions';
import { VALID_MEMES_TYPES } from '../../utilities/Constants';
import { searchMemesTagsSuggestion } from '../../services/elastic';
import { retrieveData, storeData } from '../../utilities/persistance';
import SignUpModal from '../../components/SignUpModal/SignUpModal';

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
        imageType: '',
        fileSize: 0,
        openSignUpModal: false
    };
    tagsInputRef = null;

    componentDidMount() {
        this.validateUserIsAuthenticated();

        this.keyboardDidShowSubscription = Keyboard.addListener(
            'keyboardDidShow',
            (e) => {
                this.setState({ keyboardOpen: true, keyboardHeight: e.endCoordinates.height });
                if (this.scrollModal && this.state.tags.length === 0) {
                    this.scrollModal.scrollToEnd();
                }
            },
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowSubscription.remove();
    }

    validateUserIsAuthenticated = async () => {
        const hasUploadImage = await retrieveData('firstImageUploaded');
        if (this.props.uid || !hasUploadImage) {
            this.getImage();
        } else {
            this.setState({ openSignUpModal: true });
        }
    }

    getImage = async () => {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            includeExtra: true,
            includeBase64: false
        });

        if (result.assets && result.assets[0]) {
            const selectedMedia = result.assets[0];

            if (!VALID_MEMES_TYPES.includes(selectedMedia.type)) {
                return this.setState({ uploadStatusModalOpen: true, uploadStatus: 4 });
            }

            if (selectedMedia.fileSize > 5000000) {
                return this.setState({ uploadStatusModalOpen: true, uploadStatus: 1 });
            }

            if (this.tagsInputRef) {
                this.tagsInputRef.focus();
            }

            return this.setState({
                imagePath: selectedMedia.uri,
                imageHeight: selectedMedia.height,
                imageWidth: selectedMedia.width,
                imageType: selectedMedia.type
            });
        } else {
            this.props.navigation.dismiss();
        }
    }

    askForSuggestions = (textInput) => {
        this.fetchTimeout = setTimeout(async () => {
            try {
                const searchResults = await searchMemesTagsSuggestion(textInput, 8);

                let duplicated = false;
                const suggestionsArr = [textInput];
                const fetchedSuggestionsArr = searchResults.suggest.suggestions[0].options.map((tag) => tag.text);
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
        newTagsArr.unshift(title.trim());
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

                    const userLanguage = getLocaleLanguage();
                    await saveMemeModerationRequest(
                        moderationRequestKey,
                        this.props.uid,
                        image.downloadURL,
                        this.state.imageWidth,
                        this.state.imageHeight,
                        this.state.imageType,
                        tags,
                        userLanguage
                    );

                    this.setState({
                        uploadingModalOpen: false,
                        uploadStatusModalOpen: true,
                        uploadStatus: 0 // 0 = ok | 1 = file size | 2 = rejected | 3 = error
                    });

                    const hasUploadImage = await retrieveData('firstImageUploaded');
                    if (!hasUploadImage) {
                        await storeData('firstImageUploaded', 'true');
                    }
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
            console.log(error);
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

    handleFinalCardButton = async () => {
        this.setState({ uploadingModalOpen: false, uploadStatusModalOpen: false });

        if (this.state.uploadStatus === 0) {
            if (!this.props.uid) {

                return this.setState({ openSignUpModal: true });
            }

            return this.props.navigation.navigate('Explore');
        }

        return this.props.navigation.navigate('Upload');
    }

    onSignUpDismiss = () => {
        this.setState({ openSignUpModal: false });
        this.props.navigation.dismiss();
    }

    onSignUpSuccess = () => {
        this.setState({ openSignUpModal: false });
        if (this.state.tags.length > 0) {
            this.props.navigation.dismiss();
        } else {
            this.getImage();
        }
    }

    renderChip = ({ item, index }) => (
        <Chip
            title={item}
            last={index === (this.state.tagInput === '' ? this.state.tags.length - 1 : this.state.suggestTags.length - 1)}
            active={this.state.tagInput === '' || index === 0}
            onPress={(e) => this.handleTagPress(item, index)} />
    );

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
                        keyboardShouldPersistTaps='handled'
                        contentContainerStyle={{ paddingHorizontal: 16 }}>
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
                            <TextInput ref={(tagsInputRef) => this.tagsInputRef = tagsInputRef}
                                autoFocus
                                placeholder={translate('uploadContent.addTags.typeToAdd')}
                                placeholderTextColor={'#FFFFFF66'}
                                style={styles.textInput}
                                onChange={this.handleTagInput}
                                value={this.state.tagInput}
                                returnKeyType='done'
                                keyboardAppearance='dark' />
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
                        {this.state.tags.length > 0 &&
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
            <SignUpModal open={this.state.openSignUpModal}
                    onClose={this.onSignUpDismiss}
                    title={translate('signUpModalUploadContent.title')}
                    benefits={[
                        translate('signUpModalUploadContent.benefit1'),
                        translate('signUpModalUploadContent.benefit2'),
                        translate('signUpModalUploadContent.benefit3')
                    ]}
                    onSignUpSuccess={this.onSignUpSuccess} />
            <SafeAreaView style={{ flex: 0, backgroundColor: '#141539' }} />
            </>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(AddTags);