import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	FlatList,
	RefreshControl
} from 'react-native';

import styles from './style';
import { loadStreamsByListIndex } from '../../actions/streamsActions';
import Colors from '../../utilities/Colors';
import NewEventCard from '../NewEventCard/NewEventCard';
import QaplaText from '../QaplaText/QaplaText';
import { translate } from '../../utilities/i18';
import { HOURS_IN_DAY, ONE_HOUR_MILISECONDS } from '../../utilities/Constants';

class StreamsList extends React.Component {
	state = {
		refreshing: false,
		scrolled: false,
        title: ''
	};

    componentDidMount() {
        this.props.loadStreamsByListIndex(this.props.uid, this.props.index);
        this.setState({ title: this.getDayNameByIndex(this.props.index) });
    }

    getDayNameByIndex = (index) => {
        const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
        const listDay = new Date((new Date()).getTime() + (ONE_HOUR_MILISECONDS * HOURS_IN_DAY) * index);
        return index === 0 ?  translate('days.today') : (index === 1 ? translate('days.tomorrow') : translate(`days.${days[listDay.getDay()]}`));
    }

	renderEventOnList = ({ item }) => (
		<NewEventCard onPress={this.props.onCardPress}
			dynamicSeparationWidth={this.props.dynamicSeparationWidth}
			scrolled={this.state.scrolled}
			key={`event-${item.id}`}
			stream={item}
			uid={this.props.uid}
			eventToDisplay={this.props.eventToDisplay} />
    );

	render() {
        const streamsToRender = this.props.streamsLists.streams[this.props.index];

        // No streams this day, do not render nothing
        if (Object.keys(streamsToRender).length) {
            return (
                <View style={styles.listContainer}>
                    <QaplaText style={styles.sectionHeader}>{this.state.title}</QaplaText>
                    <FlatList data={Object.keys(streamsToRender).map((key) => (streamsToRender[key]))}
                        onScrollBeginDrag={() => { if (this.props.dynamicSeparation) {this.setState({ scrolled: true });}}}
                        onMomentumScrollEnd={(e) => { if (this.props.dynamicSeparation) {this.setState({scrolled: e.nativeEvent.contentOffset.x >= 20});}}}
                        horizontal
                        refreshControl={<RefreshControl
                            progressBackgroundColor={Colors.eventCardBackground}
                            colors={[Colors.greenQapla]}
                            tintColor={Colors.greenQapla}
                            onRefresh={this.refreshEvents}
                            refreshing={this.state.refreshing} />}
                        initialNumToRender={5}
                        renderItem={this.renderEventOnList}
                        ListFooterComponent={() => <View style={{ height: 30 }} />}
                        keyExtractor={(item) => item.id} />
                </View>
            );
        }

        return null;
	}
}

function mapStateToProps(state) {
    /**
     * For some reason if we map the state.streamsReducer.streamsLists.streams directly to our props when it is updated
     * (on streamsReducer) the update does not reach the component (it does not trigger a re render) but if we map
     * state.streamsReducer.streamsLists when the streams array is updated we inmediately receive the update
     */
    return {
        streamsLists: state.streamsReducer.streamsLists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loadStreamsByListIndex: (uid, index) => loadStreamsByListIndex(uid, index)(dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamsList);
