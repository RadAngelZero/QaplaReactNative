import React, { Component } from 'react';
import { View } from 'react-native';

class InteractionsLoadHandler extends Component {

    componentDidMount() {
        console.log('to interactions');
        this.props.navigation.navigate('Interactions');
    }

    render() {
        return (
            <View style={{
                width: '100%',
                height: '100%',
                flex: 1,
                backgroundColor: '#0D1021'
            }} >
                {console.log('test')}
            </View>
        )
    }

}

export default InteractionsLoadHandler;