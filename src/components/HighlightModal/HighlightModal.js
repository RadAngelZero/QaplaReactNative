// josep.sanahuja - 17-08-2019 - us90 - File creation

import React, { Component } from 'react';
import { 
  View,
  Text,
  Modal,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native';

import styles from './style';
import { withNavigation } from 'react-navigation';

const TOP_QUADRANT            = 0;
const BOTTOM_QUADRANT         = 1;
const TOP_QUADRANT_TOP        = 2;
const TOP_QUADRANT_BOTTOM     = 3;
const BOTTOM_QUADRANT_TOP     = 4;
const BOTTOM_QUADRANT_BOTTOM  = 5;



class HighlightModal extends Component {
  
  constructor(props) {
    super(props);
  
    this.childWrapper = React.createRef();

    this.state = {
      elemPosX: 0,
      elemPosY: 0,
      elemHeight: 0,
      elemWidth: 0,
      flag: false,
      flag2: false
    };

    this.quad = null;
    this.subQuad = null;
  }

   /**
   *  Callbacks used in render()
   */

   /**
    * Description:
    * Perform a series of actions for the Modal, including the main one which is 'closing the modal'
    * and navigation to next screen. The other actions are performed via cb1 and cb2 props,
    * which are executed sequentially, cb1 1st, cb2 2nd, and they are executed in a synchronous way.
    * 
    * @param None
    */
    action = async () => {
      // Close the Modal
      this.closeModal();

      // cb1 executes before cb2, and in case cb1 is not defined and cb2 is, then cb2 is excecuted
      // even though cb1 is undefined.
      if (this.props.cb1 !== undefined && this.props.cb1 !== null){
        console.log('MUUUUUUUUU');
        await this.props.cb1();  
      }

      if (this.props.cb2 !== undefined && this.props.cb2 !== null){
        await this.props.cb2();
      }

      // If there is no screen defined in props, the modal will close without any navigation
      if (this.props.nextScreen) {
        this.props.navigation.navigate(this.props.nextScreen);
      }
    }

    /**
    * Description:
    * Closes the Modal by using the function given in props.
    * 
    * @param None
    */
    closeModal = async () => {
      // Close the Modal
      this.props.onClose();
    }

    measureChildComponent = (event) => {
      
      if (!this.state.timeoutStarted) {
        
        // 27-08-2019: measureInWindow can get invalid and non intended values for pageX, pageY,
        // width, height. Therefore, a setTimeOut what makes is to delay the calculus
        // that gets layout info for our object in the final position on screen in absolute
        // values. It can depend on whether the element is rendered after a scrollview that 
        // nurtures from data and therefore it delays the correct position of our object because
        // it does not expand the view completely. (At least thats a theory, you can play with
        // that and add more details here in the documentation)
        setTimeout( () => {

          // pageX, pageY, width, height are absolute values within the display
          this.childWrapper.current.measureInWindow((pageX, pageY, width, height) => {
            console.log('* Component width is: ' + width)
            console.log('* Component height is: ' + height)
            console.log('* X offset to page: ' + pageX)
            console.log('*Y offset to page: ' + pageY)

            // Initially elemPosX and elemPosY have 0 value, therefore we prevent and update of
            // the state, to prevent a re-render. However, at this point this might have 0 consecuences
            // as a result of the timeoutStarted timeoutEnded flags. Leaving it though.
            // TODO: Check if the if condition really makes sense to be here.
            if ((this.state.elemPosX !== pageX) || (this.state.elemPosY !== pageY)){ 
              this.setState({
                elemPosX: pageX,
                elemPosY: pageY,
                elemHeight: height,
                elemWidth: width
              });

              this.setState({
                timeoutEnded: true
              });
            }
          }); 
        }, this.props.showDelay);   

        // timeoutStarted indicates that a setTimeout was scheduled for this.props.showDelay. 
        // timeoutEnded will indicate when the computing of the object layout dimensions is finished. 
        this.setState({
              timeoutStarted: true
        });
      }  
    }

    render() {
        const { children, visible, onClose } = this.props;
        const { elemPosX, elemPosY, elemHeight, elemWidth} = this.state;

        const ChildComponentWithRef = React.forwardRef((props, ref) => 
            React.cloneElement(this.props.children, {
                ...props,
                ref,
                ...props.style
            })
        );

        // Get Mobile window dimensions (height, width)
        const displayHeight = Dimensions.get('window').height;
        const displayMid = displayHeight / 2;
        
        // measures Object is initialized with init values (all 0's), it is updated once
        // elemPosX / elemPosY / elemWidth / elemHeight changes value then measures has
        // new internal value.
        const measures = {
          elemPosX: elemPosX,
          elemPosY: elemPosY,
          elemWidth: elemWidth,
          elemHeight: elemHeight
        }

        // If setTimeOut was scheduled and executed then Quadrant and SubQuadrant
        // can be computed. We save resources by computing them only once since the screen
        // is in portrait mode always.
        if (this.state.timeoutEnded && this.quad === null && this.subQuad === null) {
          this.quad = computeQuadrant(measures);
          this.subQuad = computeSubQuadrant(measures);
        }

        return (
          <View>
            {!children ? null : (
                <View ref={this.childWrapper} onLayout={this.measureChildComponent}>
                  <ChildComponentWithRef/>
                </View>
            )}
            
            <Modal
              animationType="none"
              transparent={true}
              visible={(visible && this.state.timeoutEnded)}
              onRequestClose={this.action}>

              <View style={getHighlightContainerStyle2(measures, quad, subQuad)}>
                <View style={getAbsComponentPosOffsetsStyle2(measures, quad, subQuad)}>
                  <ChildComponentWithRef style={this.props.children.props.style}/>
                </View>

                {/* This is the info content from the Component */}
                <View style={getAbsTextInfoPosOffsetsStyle2(measures, quad, subQuad)}>
                  <Text style={{color:'white', fontSize:30, marginLeft:40, marginRight: 40}}>{this.props.header}</Text>
                  <Text style={{color:'white', fontSize:14, marginLeft:40, marginRight: 40}}>{this.props.body}</Text>
                  <View style={{flexDirection:'row', justifyContent: 'flex-end', marginTop: 10, marginRight: 40}}>
                    <TouchableWithoutFeedback onPress={this.action}>
                        <View>
                            <Text style={{color:'#6D7DDE', fontSize:24, right: 0}}>Entendido :) </Text>
                        </View>
                    </TouchableWithoutFeedback>

                  </View>
                </View>
                
              </View>
            </Modal>
          </View>
        );
    }
}

function getHighlightContainerStyle(measures) {
  let res = null;

  // Computes, according to where the component is placed in the window, to what part of the
  // screen (top / bottom) the component is. Display is divided in a first step into two 
  // vertical portions (top / bottom).
  let quad = computeQuadrant(measures);

  console.log("Quadrant: " + quad);

  if (quad === TOP_QUADRANT){
    res = styles.highlightTopContainer;
  }
  else if (quad === BOTTOM_QUADRANT){
    res = styles.highlightBottomContainer;
  }
  else {
    console.log("moo");
  }

  return res;
}

function getHighlightContainerStyle2(measures, quad, subQuad) {
  let res = null;

  console.log("Quadrant: " + quad);

  if (quad === TOP_QUADRANT){
    res = styles.highlightTopContainer;
  }
  else if (quad === BOTTOM_QUADRANT){
    res = styles.highlightBottomContainer;
  }
  else {
    console.log("moo");
  }

  return res;
}

function getAbsComponentPosOffsetsStyle(measures) {
  const displayHeight = Dimensions.get('window').height;
  const displayMid = displayHeight / 2;
  
  let res = null;
  let quad = computeQuadrant(measures);

  if (quad === TOP_QUADRANT){
    res = {top: measures.elemPosY, left: measures.elemPosX};
  }
  else if (quad === BOTTOM_QUADRANT){
    
    // description
    res = {top: measures.elemPosY - displayMid, left: measures.elemPosX};
  }
  else {
    console.log("moo");
  }
  
  return res;
}

function getAbsComponentPosOffsetsStyle2(measures, quad, subQuad) {
  const displayHeight = Dimensions.get('window').height;
  const displayMid = displayHeight / 2;
  
  let res = null;

  if (quad === TOP_QUADRANT){
    res = {top: measures.elemPosY, left: measures.elemPosX};
  }
  else if (quad === BOTTOM_QUADRANT){
    
    // description
    res = {top: measures.elemPosY - displayMid, left: measures.elemPosX};
  }
  else {
    console.log("moo");
  }
  
  return res;
}

function getAbsTextInfoPosOffsetsStyle(measures) {
  const displayHeight = Dimensions.get('window').height;
  const displayMid = displayHeight / 2;
  
  let res = null;
  let quad = computeSubQuadrant(measures);

  if (quad === TOP_QUADRANT_TOP){
    res = {position: 'absolute', top: displayMid - 190};
  }
  else if (quad === TOP_QUADRANT_BOTTOM){
    
    // description
    res = {position: 'absolute', top: 50};
  }
  else if (quad === BOTTOM_QUADRANT_TOP){
    res = {position: 'absolute', bottom: 50};
  }
  else if (quad === BOTTOM_QUADRANT_BOTTOM){
    console.log("marramiauuuuu");
    // description
    res = {position: 'absolute', bottom: 240};
  }
  else {
    console.log("moo");
  }
  
  return res;
}

function getAbsTextInfoPosOffsetsStyle2(measures, quad, subQuad) {
  const displayHeight = Dimensions.get('window').height;
  const displayMid = displayHeight / 2;
  
  let res = null;

  if (subQuad === TOP_QUADRANT_TOP){
    res = {position: 'absolute', top: displayMid - 190};
  }
  else if (subQuad === TOP_QUADRANT_BOTTOM){
    
    // description
    res = {position: 'absolute', top: 50};
  }
  else if (subQuad === BOTTOM_QUADRANT_TOP){
    res = {position: 'absolute', bottom: 50};
  }
  else if (subQuad === BOTTOM_QUADRANT_BOTTOM){
    console.log("marramiauuuuu");
    // description
    res = {position: 'absolute', bottom: 240};
  }
  else {
    console.log("moo");
  }
  
  return res;
}

function computeQuadrant(measures) {
  const displayWidth = Dimensions.get('window').width;
  const displayHeight = Dimensions.get('window').height;
  const displayMid = displayHeight / 2;
  let res = TOP_QUADRANT;

  // First Quadrant
  if (measures.elemPosY + measures.elemHeight < displayMid) {
    res = TOP_QUADRANT;
  }
  else if (measures.elemPosY + measures.elemHeight >= displayMid) {
    res = BOTTOM_QUADRANT;
  }
  else {
    console.log('[Highlight] {computeQuadrant} - Should not be here!');
  }

  return res;
}

function computeSubQuadrant(measures) {
  const displayWidth  = Dimensions.get('window').width;
  const displayHeight = Dimensions.get('window').height;
  const displayMid    = displayHeight / 2;
  const displayQuad   = displayMid / 2;
  
  let res = TOP_QUADRANT;
  
  // First compute Quadrant 
  let quad = computeQuadrant(measures);

  console.log('Quadrant: ' + quad);

  if (quad === TOP_QUADRANT) {
    
    // TOT-TOP ?
    if (measures.elemPosY + measures.elemHeight < displayQuad){
      res = TOP_QUADRANT_TOP;
    }
    else if (
      measures.elemPosY + measures.elemHeight > displayQuad &&
      measures.elemPosY + measures.elemHeight <= displayMid){
      res = TOP_QUADRANT_BOTTOM;
    }
    else{
      console.log('[Highlight] {computeSubQuadrant} {TOP_QUADRANT} - Should not be here!');
    }
  }
  else if (quad === BOTTOM_QUADRANT) {
    
    // TOT-TOP ?
    if (measures.elemPosY + measures.elemHeight > displayMid &&
      measures.elemPosY + measures.elemHeight <= (displayMid + displayQuad)){
      res = BOTTOM_QUADRANT_TOP;
    }
    else if (
      measures.elemPosY + measures.elemHeight > displayMid &&
      measures.elemPosY + measures.elemHeight > (displayMid + displayQuad) &&
      measures.elemPosY + measures.elemHeight <= displayHeight){
      res = BOTTOM_QUADRANT_BOTTOM;
    }
    else{
      console.log('[Highlight] {computeSubQuadrant} {BOTTOM_QUADRANT} - Should not be here!');
    }
  }
  else {
    console.log('[Highlight] {computeSubQuadrant} - Should not be here!');
  }

  console.log("SubQuadrant: " + res);
  return res;
}

HighlightModal.defaultProps = {
  showDelay: 4000
}

export default withNavigation(HighlightModal);