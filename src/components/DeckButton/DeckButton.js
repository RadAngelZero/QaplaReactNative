import React, { Component } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import images from '../../../assets/images';
import styles from './styles';

class DeckButton extends Component {

    backgrounds = [
        images.png.InteractionGradient1.img,
        images.png.InteractionGradient2.img,
        images.png.InteractionGradient3.img,
        images.png.InteractionGradient4.img,
        images.png.InteractionGradient5.img,
        images.png.InteractionGradient6.img,
    ]

    render() {
        return (
            <>
                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={styles.personalizeButtonContainer}
                >
                    <ImageBackground
                        source={this.backgrounds[this.props.backgroundIndex || 0]}
                        style={styles.personalizeButtonBackgroundImage}
                    >
                        {this.props.icon && <View style={styles.personalizeButtonIconContainer}>
                            <this.props.icon style={styles.personalizeButtonIcon} />
                        </View>}
                        <Text style={styles.personalizeButtonIconText} >
                            {this.props.label}
                        </Text>
                        {this.props.cost && this.props.hideCost === undefined && <View style={styles.personalizeButtonDisplayQoinsContainer}>
                            <images.svg.qoin style={styles.qoin} />
                            <Text style={styles.personalizeButtonDisplayQoinsText}>
                                {this.props.cost}
                            </Text>
                        </View>}
                    </ImageBackground>
                </TouchableOpacity>
            </>
        );
    }

}

export default DeckButton;