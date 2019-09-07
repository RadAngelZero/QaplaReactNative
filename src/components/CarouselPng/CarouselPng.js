// diego	  	  - 03-09-2019 - us92 - Update carousel according to inVision design

import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';

import Images from './../../../assets/images';
import { styles } from './style';

const Divider = Images.png.divider.img;

class CarouselPng extends Component { 
    onScrollEnd = (e) => {
        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);

        this.props.setCurrentIndex(pageNum);
    }

    render() {
        return (
            <ScrollView
                horizontal
                pagingEnabled
                disableIntervalMomentum
                onScroll={this.onScrollEnd}
                showsHorizontalScrollIndicator={false}>
                {this.props.carrouselData.map((slide, index) => (
                    <View key={`OnBoardingImages${index}`} style={styles.flatListContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={slide.Image}/>
                        </View>
                        <Text style={styles.title}>{slide.title}</Text>
                        <Image style={styles.divider} source={Divider} />
                        <Text style={styles.description}>{slide.description}</Text>
                    </View>
                ))}
            </ScrollView>
        );
    }
}

export default CarouselPng;