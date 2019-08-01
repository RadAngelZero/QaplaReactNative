// diego          - 29-07-2019 - us55 - Update styles to make screen look like the mockup of inVision iOS
// josep.sanahuja - 15-07-2019 - us25 - Remv. cancelButton

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0e1222'
    },
    rowContainer: {
        marginRight: 30,
        marginLeft: 30,
        alignSelf: 'center'
    },
    imageHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 55,
    },
    headerRow1: {
    	flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '5%'
    },
    hr1: {
       marginRight: '25%',
       width: '25',
       height: '25'
    },
    gameName: {
        fontSize: 16,
        color: '#FFF',
        textAlignVertical: 'center'
    },
    hr3: {
        marginLeft: '25%',
        alignSelf: 'flex-end'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#3DF9DF',
    },
    rowIcon: {
        width: '20',
        height: '20',
        marginRight: '6%'
    },
    infoContainer: {
    	flexDirection: 'row',
        marginBottom: 8
    },
    elemR1: {
    	marginRight: '10%',
        color: '#FFF',
        textAlignVertical: 'top',
        fontSize: 12
    },
    rightTextStyle: {
        color: '#FFF',
        textAlignVertical: 'top',
        fontSize: 12
    },
    gamertag: {
        color: '#FFF',
        textAlign: 'center',
        fontSize: 12,
        marginTop: 10
    },
    activeColor: {
        color: '#3DF9DF'
    },
    bottomButton: {
        marginTop: 177,
        backgroundColor: '#FA2D79',
        borderRadius: 100,
        elevation: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        marginRight: 80,
        marginLeft: 80
    },
    bottomButtonText: {
        paddingVertical: 14,
        paddingHorizontal: 20,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#FFF'
    }
});