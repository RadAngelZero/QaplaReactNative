import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Images from '../../../assets/images';
import { saveUserProfileImg, getUserProfileImgUrl } from '../../services/storage';
import { updateUserProfileImg } from '../../services/database';

import ImagePickerModal from '../ImagePicker/ImagePickerModal/ImagePickerModal';

class EditProfileImgBadge extends Component {
    constructor(props) {
    	super(props);

    	this.state = {
    		showImgPckModal: false,
        	picture: ''
    	};
    }

    /**
     * Sends the selected picture by ImagePickerModal and sends it to Firebase Storage.
     *
     * @params {Object} picture Picture selected in ImagePickerModal
     */
    saveImage = async (picture) => {
        this.setState({ picture });

        let task = saveUserProfileImg(this.props.uid, picture.node.image.uri);

        // In case the picture is successfully stored in Firebase Datastorage,
        // then an url of this image will be saved in Firebase DB.
        if (task !== null) {
            task.then(async () => {
                try {
                    const imgUrl = await getUserProfileImgUrl(this.props.uid);

                    if (imgUrl !== null && imgUrl !== undefined){
                        updateUserProfileImg(this.props.uid, imgUrl);
                    }
                }
                catch(err) {
                	console.error(err);
                }
            });

        }
    }

    /**
     * Closes ImagePickerModal
     */
    closeImgPckModal = () => {
        this.setState({
            showImgPckModal: false
        });
    }

    /**
     * Opens ImagePickerModal
     */
    openImgPckModal = () => {
        this.setState({
            showImgPckModal: true
        });
    }

    render() {
        return (
        	<>
	        	<TouchableOpacity
                    style={this.props.style}
                    onPress={this.openImgPckModal}>
                    {this.props.children}
		        </TouchableOpacity>
		        <ImagePickerModal
                    visible={this.state.showImgPckModal}
                    saveImage={this.saveImage}
                    onClose={this.closeImgPckModal} />
	        </>
        );
    }
}

function mapStateToProps(state) {
    /**
     * Check if user object (in redux) contains data (when a user is not logged
     * or a user make signout their redux object is empty)
     */
    if (Object.keys(state.userReducer.user).length > 0) {
        return {
            uid: state.userReducer.user.id
        }
    }

    /**
     * If the user is not logged, then the user will be rejected from this
     * screen, it doesn't matter this return, is just added because
     * the screen is showed (some miliseconds) and we must return an object
     * from this functions (redux requirements)
     */
    return {
        user: state.userReducer.user
    };
}

export default connect(mapStateToProps)(EditProfileImgBadge);
