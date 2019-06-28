import React, { Component } from 'react';
import { View, ScrollView, FlatList, Image, Button, Text, Switch} from 'react-native';

import { styles } from './style';

import {getDimensions} from '@utilities/iosAndroidDim'

pageIndx = -1;

class CarouselPng extends Component { 
    
    render() {

        // Images used by the Carousel
        const { images} = this.props;

        console.log("[Carousel] : images: " + JSON.stringify(images) + " pageIndex: " + JSON.stringify(pageIndx));

        // If there ara no images to show then the Carousel is not rendered.
        // NOTE: It can be argued that it is better to render a placeholder image
        // in case there are no images to show, but that is a UX decision to be made
        if (images && images.length) {
            console.log("images.length: " + images.length);
            return (
              <FlatList
                    horizontal
                    pagingEnabled
                    initialNumToRender={1}
                    onMomentumScrollEnd={this.onScrollEnd.bind(this)}
                    showsHorizontalScrollIndicator={false}
                    data = {images}
                    keyExtractor={(item, index) => item.toString()}
                    renderItem = {({item,index}) => {
                        return (
                           <View style={styles.flatListContainer}> 
                                <Image  style={styles.image} source={item}/>                                        
                           </View>
                        );
                    }}
                />
               
            );
        }

        console.log("[Carousel] : Carousel has no images.");
        return null;
    }

    onScrollEnd(e) {
        const {emmiter} = this.props;

        let contentOffset = e.nativeEvent.contentOffset;
        let viewSize = e.nativeEvent.layoutMeasurement;

        // Divide the horizontal offset by the width of the view to see which page is visible
        let pageNum = Math.floor(contentOffset.x / viewSize.width);
        console.log('scrolled to page ', pageNum);

        emmiter.notify({pageIndex: pageNum});
    }


}

export default CarouselPng;

// <ScrollView
//                         horizontal
//                         pagingEnabled
//                         showsHorizontalScrollIndicator={false}
                        
//                     >
//                         {
//                             images.map((image, index) => (
//                                 <View key = {index} style={styles.carouselContainer}>
//                                     <Image style={styles.image} source={image}/>
//                                     <Text style={styles.text}>{index + 1} / {images.length}</Text>
//                                       <View style={styles.switchContainer}>
//                                       <Text style={styles.hideTutorial}>No volver a mostrar Tutorial:</Text>
//                                       <Switch
//                                          style = {styles.switch}
//                                          value = {true}
//                                       />
//                                       </View>
//                                       <Button
//                                           title="Empieza a Retar"
//                                           disabled={(index + 1 != images.length) ? true : false}
//                                           color="#36E5CE"
//                                           accessibilityLabel="Learn more about this purple button"
//                                        />
//                                 </View>
//                             ))
//                         }
//                     </ScrollView>






 // <FlatList
                    
 //                    horizontal
 //                    pagingEnabled
 //                    showsHorizontalScrollIndicator={false}
 //                    data = {images}
 //                    keyExtractor={(item, index) => item.toString()}
 //                    renderItem = {(item, index) => {
 //                        // this.pageIndexUpdate(index); 
 //                        // console.log("Miau " + JSON.stringify(item));
                         
 //                        return (
 //                            <View style={styles.flatListContainer}> 
 //                                <Image style={styles.image} source={item}/>                                        
 //                            </View>
 //                        );
 //                    }

 //                }
 //                />