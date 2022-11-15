import React, { Component } from 'react';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import SignUpModal from '../../components/SignUpModal/SignUpModal';
import { retrieveData } from '../../utilities/persistance';
import styles from './style';

class ReactionTypesScreen extends Component {
    state = {
        openSignUpModal: false,
        reactionLevel: 1
    };

    goToReaction = async (reactionLevel) => {
        if (this.props.uid) {
            this.props.navigation.navigate('TweetReactionScreen', { reactionLevel });
        } else {
            const freeReactionsSent = await retrieveData('freeReactionsSent');
            if (freeReactionsSent) {
                this.setState({ openSignUpModal: true, reactionLevel });
            }
        }
    }

    onSignUpSuccess = () => {
        this.setState({ openSignUpModal: false });
        this.props.navigation.navigate('TweetReactionScreen', { reactionLevel: this.state.reactionLevel });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TouchableOpacity style={{
                        marginTop: 16,
                        backgroundColor: '#FFF'
                    }}
                    onPress={() => this.goToReaction(1)}>
                    <Text>
                        Nivel 1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                        marginTop: 16,
                        backgroundColor: '#FFF'
                    }}
                    onPress={() => this.goToReaction(2)}>
                    <Text>
                        Nivel 2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                        marginTop: 16,
                        backgroundColor: '#FFF'
                    }}
                    onPress={() => this.goToReaction(3)}>
                    <Text>
                        Nivel 3
                    </Text>
                </TouchableOpacity>
                <SignUpModal open={this.state.openSignUpModal}
                    onClose={() => this.setState({ openSignUpModal: false })}
                    title='Keep reacting on stream'
                    benefits={[
                        '⚡️ Use channel points to send custom memes',
                        '🔥 Upgrade your memes',
                        '🌱 Support your fave streamers'
                    ]}
                    onSignUpSuccess={this.onSignUpSuccess} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    };
}

export default connect(mapStateToProps)(ReactionTypesScreen);