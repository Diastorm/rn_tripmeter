import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import Picker from './Picker';

class Tripmeter extends Component {
    static defaultProps = {
        tripmeterHeight: 225,
        boxHeight: 25,
        digits: 6
    }

    state = {
        digits: [],
        selectedDigits: []
    }

    componentWillMount() {
        const digits = this.padStart(this.props.initial.toString(), this.props.digits, '0').split('');
        this.props.onTripMeterChange(Number(digits.join('')));
        this.setState({ digits, selectedDigits: digits });
    }

    onPickerSelect = (value, placeValue) => {
        let selectedDigits = this.state.selectedDigits;
        selectedDigits[placeValue] = value;
        this.props.onTripMeterChange(Number(selectedDigits.join('')));
        this.setState({ selectedDigits });
    }

    padStart = (targetString, targetStringLength, pad) => {
        let targetLength = targetStringLength >> 0; //truncate if number or convert non-number to 0;
        if (targetString.length > targetLength) {
            return String(targetString);
        }
        targetLength -= targetString.length;
        let padString = pad;
        if (targetLength > padString.length) {
            padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }
        return padString.slice(0, targetLength) + String(targetString);
    };

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
    initial: PropTypes.number,
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
