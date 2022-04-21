import React from 'react';
import { connect } from 'react-redux';
import {
	View,
	FlatList
} from 'react-native';

import styles from './style';
import { loadStreamsByListIndex } from '../../actions/streamsActions';
import StreamCard from '../StreamCard/StreamCard';
import QaplaText from '../QaplaText/QaplaText';
import { translate } from '../../utilities/i18';
import { HOURS_IN_DAY, ONE_HOUR_MILISECONDS } from '../../utilities/Constants';

class StreamsList extends React.Component {
    streamsRendered = 0;
	state = {
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

	renderEventOnList = ({ item }) => {
        if (!this.props.loadOnlyUserStreams && item.isUserAParticipant) {
			return null;
		} else if (this.props.loadOnlyUserStreams && !item.isUserAParticipant) {
			return null;
		}

        if (this.props.index === 1) {
            console.log(item.id)
        }

        this.streamsRendered++;

        return (
            <StreamCard onPress={this.props.onCardPress}
                dynamicSeparationWidth={this.props.dynamicSeparationWidth}
                scrolled={this.state.scrolled}
                key={`stream-${item.id}`}
                stream={item}
                uid={this.props.uid}
                eventToDisplay={this.props.eventToDisplay} />
        );
    }

	render() {
        const streamsToRender = this.props.streamsLists.streams[this.props.index];

        // If there are no streams or the user is already participating in all the featured streams render null
        if (Object.keys(streamsToRender).length && Object.keys(streamsToRender).some((streamId) => this.props.loadOnlyUserStreams ? streamsToRender[streamId].isUserAParticipant :  !streamsToRender[streamId].isUserAParticipant)) {
            return (
                <View style={styles.listContainer}>
                    {this.streamsRendered > 0 &&
						<QaplaText style={styles.sectionHeader}>{this.state.title}</QaplaText>
					}
                    <FlatList data={Object.keys(streamsToRender).map((key) => (streamsToRender[key]))}
                        onScrollBeginDrag={() => { if (this.props.dynamicSeparation) {this.setState({ scrolled: true });}}}
                        onMomentumScrollEnd={(e) => { if (this.props.dynamicSeparation) {this.setState({scrolled: e.nativeEvent.contentOffset.x >= 20});}}}
                        horizontal
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

StreamsList.defaultProps = {
	loadOnlyUserStreams: false
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamsList);
