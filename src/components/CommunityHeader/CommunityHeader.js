import React, { Component } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';

import images from '../../../assets/images';

class CommunityHeader extends Component {

    render() {
        return (
            <SafeAreaView style={{ backgroundColor: '#0D1021' }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}
                    style={{ paddingBottom: 32, paddingTop: 0, paddingHorizontal: 16 }}>
                    <images.svg.backIcon />
                </TouchableOpacity>
            </SafeAreaView>
        )
    }

}


export default CommunityHeader;