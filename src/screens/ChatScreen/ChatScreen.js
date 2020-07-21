import React, { Component } from 'react';
import {
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    RefreshControl,
    View
} from 'react-native';
import { connect } from 'react-redux';

import styles from './style';

// Chat Components
import UserMessage from '../../components/Chat/UserMessage/UserMessage';
import OuterMessage from '../../components/Chat/OuterMessage/OuterMessage';
import WriteMessage from '../../components/Chat/WriteMessage/WriteMessage';
import { loadCurrentChannelPreviousMessages, listenForNewMessages } from '../../services/SendBird';
import Images from '../../../assets/images';

const UnreadMessages = ({ onPress }) => (
    <TouchableOpacity
        style={styles.unreadMessagesContainer}
        onPress={onPress}>
        <Images.svg.arrowDownIcon
            height={32}
            width={32}
            fill='#FFF'
            style={{ marginLeft: 2 }} />
    </TouchableOpacity>
);

class ChatScreen extends Component {
    state = {
        chatMessages: [],
        unreadMessages: false,
        refreshing: false
    };

    componentDidMount(){
        loadCurrentChannelPreviousMessages((chatMessages) => {
            this.setState({ chatMessages: chatMessages }, () => {
                setTimeout(() => {
                    if (this.flatList) {
                        this.flatList.scrollToEnd({ animated: true });
                    }
                }, 300);
            });
        });
        listenForNewMessages((newMessage) => {
            const messages = [...this.state.chatMessages];
            messages.unshift(newMessage);
            this.setState((state) => {
                const chatMessages = [...state.chatMessages, newMessage];
                setTimeout(() => {
                    if (this.flatList) {
                        this.flatList.scrollToEnd({ animated: false });
                    }
                }, 300);

                return { chatMessages, unreadMessages: true };
            });
        });
    }

    /**
     * Add the user sended messages to the list and send the user
     * to the bottom of the FlatList
     */
    addMessageToList = (message) => {
        const messages = [...this.state.chatMessages];
        messages.push(message);
        this.setState({ chatMessages: messages }, () => {
            setTimeout(() => {
                if (this.flatList) {
                    this.flatList.scrollToEnd({ animated: true });
                }
            }, 135);
        });
    }

    /**
     * Calculate the hours and minutes of a message with their timestamp
     */
    getMessageHour = (createdAt) => {
        const date = new Date(createdAt);
        const hours = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
        const minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;

        return `${hours}:${minutes}`;
    }

    /**
     * Called when user want to load more messages
     */
    onRefresh = () => {
        this.setState({ refreshing: true });
        loadCurrentChannelPreviousMessages((chatMessages) => {
            this.setState({ chatMessages: chatMessages }, () => {
                this.setState({ refreshing: false });
            });
        }, this.state.chatMessages.length + 40);
    }

    /**
     * Called when the user goes to the end of the FlatList
     * and hide the unreadMessages component
     */
    endReached = ({ distanceFromEnd }) => {
        this.setState({ unreadMessages: false });
    }

    render() {
        return (
            <SafeAreaView style={styles.GroupChatContainer}>
                <FlatList
                    style={styles.chatMessagesContainer}
                    ref={(flatList) => this.flatList = flatList}
                    onScroll={this.prueba}
                    onEndReached={this.endReached}
                    onEndReachedThreshold={.05}
                    data={this.state.chatMessages}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                    renderItem={({ item }) => (
                        <>
                            {item._sender.userId === this.props.uid ?
                                <UserMessage
                                hour={this.getMessageHour(item.createdAt)}
                                message={item.message} />
                            :
                                <OuterMessage
                                    userName={item._sender.nickname}
                                    image={item._sender.profileUrl}
                                    message={item.message}
                                    hour={this.getMessageHour(item.createdAt)} />
                            }
                        </>
                    )} />
                {this.state.unreadMessages &&
                    <UnreadMessages
                        unreadMessages={this.state.unreadMessages}
                        onPress={() => this.flatList.scrollToEnd({ animated: true })} />
                }
                <View style={{ marginBottom: 16 }}>
                    <WriteMessage addMessageToList={this.addMessageToList} />
                </View>
			</SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id
    }
}

export default connect(mapStateToProps)(ChatScreen);
