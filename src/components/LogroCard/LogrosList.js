// josep.sanahuja - 19-09-2019 - us114 - File creation

import React from 'react';

import {
  View,
  SafeAreaView,
  FlatList
} from 'react-native'

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
          const logroType = getLogrosType(logrosColl);

          const logrosArr = [];

          logroType.forEach((type) => {
              if (type === 'verifica') {
                  // TODO: Refactor this code in this block that is used twice.
                  // It could actually be refactor by using a query to db with a filter.
                  // However this would introduce the potential problem that we could not
                  // know how many verification logros are there in the results of the query.

                  // Get Logros Ids
                  const logroIdArr = getLogrosIds(logrosColl[type]);

                  // Traverse lgIdArr and for each id get the Object info
                  // and add it to the logros array
                  logroIdArr.forEach((id) => {
                      const logro = logrosColl[type][id];
                      logro.id = id;
                      logrosArr.push(logro); 
                  });  
              }
          });

          // Fill logrosArr with logros of all categories available at the
          // moment
          logroType.forEach((type) => {
            if (type !== 'verifica') {
                // Get Logros Ids
                const logroIdArr = getLogrosIds(logrosColl[type]);

                // Traverse lgIdArr and for each id get the Object info
                // and add it to the logros array
                logroIdArr.forEach((id) => {
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
 * Obtains the keys from logros object 
 *
 * @param {object} logrosObj Object of logros with type as key
 *
 * @return Array of logros type keys
 */
function getLogrosType(logrosObj) 
{
    return (typeof logrosObj) === 'object' ? Object.keys(logrosObj) : [];
}

/**
 * @description
 * Obtains the uids from the logro Object passed as parameter
 *
 * @param {object} logroType Object of logros of the same type
 *
 * @return Array with logros ids
 */
function getLogrosIds(logroType) {
  return (typeof logroType) === 'object' ? Object.keys(logroType) : [];
}

export default LogrosList;
