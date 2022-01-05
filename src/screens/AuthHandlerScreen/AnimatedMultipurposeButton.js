import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';

import styles from './style';
import AnimatedBackgroundColorView from './AnimatedBackgroundColorView';
import TranslateXContainer from './TranslateXContainer';
import { widthPercentageToPx } from '../../utilities/iosAndroidDim';

class AnimatedMultipurposeButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled}>
                <AnimatedBackgroundColorView style={styles.button}
                    onRef={this.props.onBackgroundRef}
                    colors={this.props.backgroundColors}>
                    <TranslateXContainer onRef={this.props.onTextRef}
                        countStartsFrom={1}
                        initialValue={1}
                        individualComponentWidth={widthPercentageToPx(70)}>
                        {this.props.children}
                    </TranslateXContainer>
                </AnimatedBackgroundColorView>
            </TouchableOpacity>
        );
    }
}

export default AnimatedMultipurposeButton;