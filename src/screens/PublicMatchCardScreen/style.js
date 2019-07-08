import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        backgroundColor: '#0e1222',
        alignSelf: 'center',
        width: '100%',
        height: '100%',
    },
    rowContainer: {
        flex:1,
        width: '85%',
        alignSelf: 'center',
    },
    imageHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '9%',
    },
    imageHeader2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: '9%',
    },
    headerRow1: {
    	flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '3%',
        marginBottom: '1%'
    },
    hr1: {
       marginRight: '25%',
       width: '25',
       height: '25'
    },
    hr2: {
        width: '25',
        height: '25'
    },
    hr3: {
        marginLeft: '25%',
        width: '25',
        height: '25'
    },
    headerRow2: {
        alignItems: 'center',
        marginBottom: '5%'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginTop: 20,
        borderBottomWidth: 1,
        borderColor: 'green',
        height: '3.5%'
    },
    col: {
        flexDirection: 'column',
    },
    rowIcon: {
        width: '20',
        height: '20',
        marginRight: '6%'
    },
    infoR1: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start',
    },
    infoR2: {
    	flexDirection: 'row',
    	justifyContent: 'flex-start'
    },
    elemR1: {
    	marginRight: '10%',
    	color: 'white'
    },
    marginBottom10: {
        marginBottom: 10
    },
    leftTextStyle: {
        color: '#FFF',
        marginLeft: 22
    },
    rightTextStyle: {
        color: '#FFF',
        
    },
    listContainer: {
        flex: 1
    },
    gamertag: {
        color: 'white'
    },
    cancelButton: {
        position: 'absolute',
        top: 20,
        left: 30,
        color: '#36E5CE'
    }
});