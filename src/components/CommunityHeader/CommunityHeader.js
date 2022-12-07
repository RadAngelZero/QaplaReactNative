import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";

import images from "../../../assets/images";

class CommunityHeader extends Component {

    render() {
        return (
            <View style={{
                backgroundColor: '#0D1021',
                paddingHorizontal: 16,
                paddingTop: 16,
                paddingBottom: 32,
            }}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <images.svg.backIcon />
                </TouchableOpacity>
            </View>
        )
    }

}


export default CommunityHeader;