import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Tooltip from 'react-native-walkthrough-tooltip';

import QaplaText from '../QaplaText/QaplaText';
import images from '../../../assets/images';
import styles from './style';

class QaplaTooltip extends Component {
    render() {
        return (
            <TouchableOpacity style={[ styles.tooltipContainer, this.props.style]} onPress={this.props.toggleTooltip}>
                <Tooltip
                    isVisible={this.props.open}
                    withOverlay={false}
                    contentStyle={styles.packageContentStyle}
                    backgroundColor='transparent'
                    content={
                        <LinearGradient
                            useAngle
                            angle={270}
                            colors={['#9B15EF', '#3108FA']}
                            style={styles.gradientContainerStyle}>
                            <QaplaText style={styles.content}>
                                {this.props.content}
                            </QaplaText>
                            <TouchableOpacity onPress={this.props.buttonAction}>
                                {this.props.buttonText &&
                                    <QaplaText style={styles.buttonText}>
                                        {this.props.buttonText}
                                    </QaplaText>
                                }
                            </TouchableOpacity>
                        </LinearGradient>
                    }>
                    <images.svg.infoIcon />
                </Tooltip>
            </TouchableOpacity>
        );
    }
}

export default QaplaTooltip;