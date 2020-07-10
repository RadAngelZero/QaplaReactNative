import React, { Component } from 'react';
import {
    SafeAreaView,
    ScrollView
} from 'react-native';

import styles from './style';
import images from '../../../assets/images';

// Chat Components
import UserMessage from '../../components/Chat/UserMessage/UserMessage';
import OuterMessage from '../../components/Chat/OuterMessage/OuterMessage';
import WriteMessage from '../../components/Chat/WriteMessage/WriteMessage';

class GroupChatScreen extends Component {
    componentDidMount(){
        if (this.scrollView) {
            setTimeout(() => this.scrollView.scrollToEnd({ animated: true }), 1000);
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.GroupChatContainer}>
                <ScrollView
                    style={styles.chatMessagesContainer}
                    ref={(scrollView) => this.scrollView = scrollView}>
                    <UserMessage
                        hour='6:42 PM'
                        message='Hello friends!' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <UserMessage
                        hour='6:42 PM'
                        message='Hello friends!' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                        <UserMessage
                        hour='6:42 PM'
                        message='Hello friends!' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                        <UserMessage
                        hour='6:42 PM'
                        message='Hello friends!' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                        <UserMessage
                        hour='6:42 PM'
                        message='Hello friends!' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                    <OuterMessage
                        userName='DHVS'
                        image={images.png.fifaXbox.img}
                        message='This event is starting in 10 minutes just a friendly reminder'
                        hour='6:40 PM' />
                </ScrollView>
				<WriteMessage />
			</SafeAreaView>
        );
    }
}

export default GroupChatScreen;
