import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import styles from './style';
import LogrosList from '../../components/LogroCard/LogrosList';
import { translate } from '../../utilities/i18';
import LevelInformationModal from '../../components/LevelInformationModal/LevelInformationModal';
import { retrieveData, storeData } from '../../utilities/persistance';

export class LogrosActivosScreen extends Component {
    state = {
        openLevelInformationModal: false
    };

    componentDidMount() {
        this.checkLevelModalStatus();
    }

    checkLevelModalStatus = async () => {
        const isLevelModalViewed = await retrieveData('level-modal-viewed');
        if (!isLevelModalViewed) {
            this.setState({ openLevelInformationModal: true });
            storeData('level-modal-viewed', 'true');
        }
    }

    render() {
        const eventToDisplay = this.props.navigation.getParam('eventToDisplay', '');
        let orderedEvents = [];

        Object.keys(this.props.logros.logrosActivos).map((logroKey) => this.props.logros.logrosActivos[logroKey])
        // Put the featured events at the top of the array
        .sort((a, b) => b.featured - a.featured)
        // Fill orderedEvents array for the SectionList of the LogrosList component
        .forEach((logro) => {
            if (logro.idLogro !== undefined) {
                const today = new Date();

                if (logro.featured) {
                    if (orderedEvents.some((eventsOfTheDay) => eventsOfTheDay.title === translate('LogrosActivosScreen.featuredEvent'))) {
                        orderedEvents[orderedEvents.length - 1].data.push(logro);
                    } else {
                        orderedEvents.push({ title: translate('LogrosActivosScreen.featuredEvent'), data: [ logro ], indexDay: orderedEvents.length });
                    }
                } else {
                    const eventDate = new Date(logro.timestamp);
                    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                    const eventSectionTitle = today.getDate() === eventDate.getDate() ?
                        translate('days.today')
                        :
                        today.getDate() + 1 === eventDate.getDate() ?
                            translate('days.tomorrow')
                            :
                            translate(`days.${days[eventDate.getDay()]}`);

                    if (orderedEvents.some((eventsOfTheDay) => eventsOfTheDay.title === eventSectionTitle)) {
                        orderedEvents[orderedEvents.length - 1].data.push(logro);
                    } else {
                        orderedEvents.push({ title: eventSectionTitle, data: [ logro ], indexDay: orderedEvents.length });
                    }
                }
            }
        });

        return (
            <SafeAreaView style={styles.sfvContainer}>
                <LogrosList
                    isUserVerified={this.props.logros.isUserVerified}
                    logros={orderedEvents}
                    userId={this.props.uid}
                    eventToDisplay={eventToDisplay} />
                <LevelInformationModal open={this.state.openLevelInformationModal}
                    onClose={() => this.setState({ openLevelInformationModal: false })} />
            </SafeAreaView>
        );
    }
}

function mapStateToProps(state) {
    return {
        uid: state.userReducer.user.id,
        logros: state.logrosReducer
    };
}

export default connect(mapStateToProps)(LogrosActivosScreen);
