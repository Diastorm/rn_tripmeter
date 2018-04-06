import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Picker from './Picker';

class Tripmeter extends Component {
    static defaultProps = {
        tripmeterHeight: 225,
        boxHeight: 25,
    }

    state = {
        digits: [],
        selectedDigits: []
    }
    componentWillMount() {
        const digits = this.props.initial.split('');
        this.setState({ digits, selectedDigits: digits });
    }

    onPickerSelect = (value, placeValue) => {
        let selectedDigits = this.state.selectedDigits;
        selectedDigits[placeValue] = value;
        this.props.onTripMeterChange(selectedDigits.join(''));
        this.setState({ selectedDigits });
    }

    renderPickers() {
        return this.state.digits.map((digit, i) => 
            (
                <Picker 
                    key={i}
                    style={styles.pickerStyle}
                    boxHeight={this.props.boxHeight}
                    pickerHeight={this.props.tripmeterHeight}
                    data={digit}
                    placeValue={i}
                    onPickerSelect={this.onPickerSelect}
                />
            )
        );
    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={{ ...styles.tripmeterStyle, height: this.props.tripmeterHeight }} >
                    { this.renderPickers() }
                </View>
            </View>
        );
    }
}

Tripmeter.propTypes = {
    boxHeight: PropTypes.number,
    tripmeterHeight: PropTypes.number,
    onTripMeterChange: PropTypes.func
};

const styles = {
    tripmeterStyle: {
        flex: 1,
        flexDirection: 'row',
        
    },
    pickerStyle: {
        flex: 1
    }
};

export { Tripmeter };
