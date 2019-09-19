// josep.sanahuja    - 18-09-2019 - us114 - File creation

import React from 'react';

import {
  View,
  Text,
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

function getLogrosType(logrosArr) 
{
    return (typeof logrosArr) === 'object' ? Object.keys(logrosArr) : [];
}

function getLogrosIds(logroCategory) {
  return (typeof logroCategory) === 'object' ? Object.keys(logroCategory) : [];
}

export default LogrosList;
