import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Picker from './Picker';

export default class Tripmeter extends Component {
    static defaultProps = {
        tripmeterHeight: 225,
        boxHeight: 25,
    }

    state = {
        digits: []
    }
    componentWillMount() {
        this.setState({ digits: this.props.initial.split('') });
    }

    renderPickers() {
        return this.state.digits.map((digit, i) => <Picker key={i} style={styles.pickerStyle} boxHeight={this.props.boxHeight} data={digit} />);
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', flex: 1 }}>
                <View style={{ ...styles.tripmeterStyle, height: this.props.tripmeterHeight }} >
                    { this.renderPickers() }
                </View>
            </View>
            
            
        );
    }
}

Tripmeter.propTypes = {
    boxHeight: PropTypes.number,
    tripmeterHeight: PropTypes.number
};

const styles = {
    tripmeterStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#cacaca'
    },
    pickerStyle: {
        flex: 1
    }
}
