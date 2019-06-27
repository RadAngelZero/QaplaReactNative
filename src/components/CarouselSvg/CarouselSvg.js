import React, { Component } from 'react';
import { View, ScrollView, Image, Button, Text} from 'react-native';

import { styles } from './style';

import {getDimensions} from '@utilities/iosAndroidDim'


class CarouselSvg extends Component { 
    render() {
        const width = (this.props.width != undefined) ? this.props.width : getDimensions().width;
        const height = (this.props.height != undefined) ? this.props.height : '30%';

        // Images used by the Carousel
        const { images } = this.props;

        console.log("[Carousel] : images: " + JSON.stringify(images));

        // If there ara no images to show then the Carousel is not rendered.
        // NOTE: It can be argued that it is better to render a placeholder image
        // in case there are no images to show, but that is a UX decision to be made
        if (images && images.length) {
            let svCount = 0;
            console.log("images.length: " + images.length);
            return (
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        
                    >
                        {
                            images.map((SvgImage, index) => (
                                <View key = {index} style={styles.carouselContainer}>
                                    <SvgImage width={getDimensions().width} height={getDimensions().height*0.8}/>
                                    <Text style={styles.text}>{index + 1} / {images.length}</Text>
                                      <Button
                                          title="Empieza a Retar"
                                          disabled={(index + 1 != images.length) ? true : false}
                                          color="#36E5CE"
                                          accessibilityLabel="Learn more about this purple button"
                                       />
                                </View>
                            ))
                        }
                    </ScrollView>
            );
        }

        console.log("[Carousel] : Carousel has no images.");
        return null;
    }
}

export default CarouselSvg;