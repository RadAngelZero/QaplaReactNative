// josep.sanahuja - 20-09-2019 - us111 - Added verified on LogroCardItem
// josep.sanahuja - 19-09-2019 - us114 - File creation

import React from 'react';

import {
  View,
  SafeAreaView,
  FlatList
} from 'react-native'

import { connect } from 'react-redux';
import styles from './style'

import {getQaplaActiveLogros} from '../../services/database'
import LogroCardItem from '../../components/LogroCard/LogroCardItem';

class LogrosList extends React.Component {
  constructor(props) {
      super(props);
    
      this.state = {
        logros: []
      };
  }  

  componentDidMount() {
      this.loadLogros();
  }

  /**
   * @description
   * Gets active logros from database and processes them so that an array of logros objects
   * is created, so that it can be used for listing. No listener is implemented.
   */
  async loadLogros() {
      try{
          const logrosColl = await getQaplaActiveLogros();
          const lgType = getLogrosType(logrosColl);

          const logrosArr = [];

          lgType.forEach((type) => {
              if (type === 'verifica') {
                  // TODO: Refactor this code in this block that is used twice

                  // Get Logros Ids
                  const lgIdArr = getLogrosIds(logrosColl[type]);

                  // Traverse lgIdArr and for each id get the Object info
                  // and add it to the logros array
                  lgIdArr.forEach((id) => {
                      const logro = logrosColl[type][id];
                      logro.id = id;
                      logrosArr.push(logro); 
                  });  
              }
          });

          // Fill logrosArr with logros of all categories available at the
          // moment
          lgType.forEach((type) => {
            if (type !== 'verifica') {
                // Get Logros Ids
                const lgIdArr = getLogrosIds(logrosColl[type]);

                // Traverse lgIdArr and for each id get the Object info
                // and add it to the logros array
                lgIdArr.forEach((id) => {
                    const logro = logrosColl[type][id];
                    logro.id = id;
                    logrosArr.push(logro); 
                });
            }
          });

          this.setState({
              logros: logrosArr
          });
      }
      catch(err) {
          console.error(err);
      }
  }

  render() {
    return (
        <SafeAreaView style={styles.sfvContainer}>
    	    	<View style={styles.listContainer}>
                <FlatList
                    data={this.state.logros}
                    initialNumToRender={5}
                    renderItem={({item}) => <LogroCardItem {...item} />}
                    keyExtractor={(item) => item.id} />      
            </View>
	      </SafeAreaView>
    );
  }
}

/**
 * @description
 * Obtains the keys from logros array 
 *
 * @param {array} logrosArr Array of logros with type as key
 *
 * @return Array of logros type keys
 */
function getLogrosType(logrosArr) 
{
    return (typeof logrosArr) === 'object' ? Object.keys(logrosArr) : [];
}

/**
 * @description
 * Obtains the uids from the logro array passed as parameter
 *
 * @param {array} logroType Array of logros of the same type
 *
 * @return Array with logros ids
 */
function getLogrosIds(logroType) {
  return (typeof logroType) === 'object' ? Object.keys(logroType) : [];
}

function mapStateToProps(state) {
    return {
        verified: state.userReducer.user.status
    };
}

export default LogrosList = connect(mapStateToProps, null)(LogrosList);
