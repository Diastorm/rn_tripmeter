import React, { Component } from 'react';
import {
    Text,
    View,
    ScrollView,
    InteractionManager
} from 'react-native';

import { CSS } from './styles';

export default class Picker extends Component {
    static defaultProps = {
        pickerHeight: 225,
        boxHeight: 25,
        scrollPad: 100
    }

    constructor(props) {
        super(props);
        let data = props.data;
        this.onScrollCount = 0;
        this.state = {
            numberRange: [...Array(10)].map((_, i) => i),
            data,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.refs.pScrollView.scrollTo({ y: this.state.data * this.props.boxHeight, animated: true });
            console.log('called DidMount');
        });
        
        if (this.props.selectTo) {
            this.selectTo(this.props.selectTo);
        }
    }

    onScrollEndDrag(e) {
        let y = e.nativeEvent.contentOffset.y;
        let onScrollEndDragCount = this.onScrollCount;
        let start = Date.now();
        if (this.fixInterval) {
            clearInterval(this.fixInterval);
        }
        //picker2 (containing selected item) has a time delay.  add 10ms delay to scroll end to sync
    
        this.fixInterval = setInterval(() => this.timeFix(start, y, onScrollEndDragCount), 10);
    }

    onMomentumScrollEnd(e) {
        this.onScrollEnd(e.nativeEvent.contentOffset.y);
    }

    onScroll(e) {
        this.onScrollCount++;
        let y = e.nativeEvent.contentOffset.y;
        if (this.refs.pScrollView2) {
            this.refs.pScrollView2.scrollTo({ y, animated: false });
        }
    }

    onScrollEnd(y) {
        let y1 = y - (y % this.props.boxHeight);
        if (y % this.props.boxHeight > (this.props.boxHeight / 2)) {
            y1 += this.props.boxHeight;
        }
        let index = y1 / this.props.boxHeight;

        console.log(y, y1, index)
        if (this.refs.pScrollView) {
            this.refs.pScrollView.scrollTo({ y: y1, animated: false });
        }
        if (this.props.onRowChange) {
            this.props.onRowChange(index);
        }
    }

    getItem(size) {
        if (this.state.numberRange.length === 0) {
            return false;
        }

        let arr = this.state.numberRange;
        return arr.map((item, i) => {
            return (
                <View key={i} >
                    <Text
                        style={{
                            color: size === 'big' ? '#4a4a4a' : '#a0a0a0', 
                            backgroundColor: 'rgba(0,0,0,0)',
                            height: this.props.boxHeight
                        }}
                    >
                        {item}
                    </Text>
                </View>
            );
        });
    }

    selectTo(index) {
        let y = index * 25;
        if (this.refs.pScrollView) {
            this.refs.pScrollView.scrollTo({ y, animated: false });
        }
    }

    timeFix(start, y, onScrollEndDragCount) {
        let now = Date.now();
        let end = 200;
        if (now - start > end) {
            clearInterval(this.fixInterval);
            if (onScrollEndDragCount === this.onScrollCount) {
                this.onScrollEnd(y);
            }
        }
    }

    handleP1ContentSizeChange = () => {
        this.handleP1ContentSizeChange = null;
        this.refs.pScrollView.scrollTo({ y: this.state.data * this.props.boxHeight, animated: true });
    }

    handleP2ContentSizeChange = () => {
        this.handleP2ContentSizeChange = null;
        this.refs.pScrollView2.scrollTo({ y: this.state.data * this.props.boxHeight, animated: true });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: this.props.pickerHeight, backgroundColor: '#ffffff' }}>
                    <ScrollView
                        onContentSizeChange={this.handleP1ContentSizeChange}
                        bounces={false}
                        onScrollEndDrag={(e) => { this.onScrollEndDrag(e); }}
                        onMomentumScrollEnd={(e) => { this.onMomentumScrollEnd(e); }}
                        onScroll={(e) => { this.onScroll(e); }}
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        ref='pScrollView'
                    >
                        <View style={{ height: this.props.scrollPad / 2 }} />
                            {this.getItem('small')}
                        <View style={{ height: this.props.scrollPad + (this.props.boxHeight / 2) }} />
                    </ScrollView>
                </View>
                <View 
                    style={{
                        height: this.props.boxHeight,
                        marginTop: -(this.props.pickerHeight - (this.props.scrollPad / 2)),
                        backgroundColor: '#fff'
                    }}
                    pointerEvents='none'
                >
                    <View style={{ height: CSS.pixel(1), backgroundColor: '#a2a2a2' }} />

                    <ScrollView
                        onContentSizeChange={this.handleP2ContentSizeChange}
                        showsVerticalScrollIndicator={false}
                        ref='pScrollView2'
                    >
                        {this.getItem('big')}
                    </ScrollView>

                    <View style={{ height: CSS.pixel(1), backgroundColor: '#a2a2a2' }} />
                </View>
                <View 
                    style={{ height: this.props.scrollPad / 2 }}
                    pointerEvents='none'
                />
            </View>
        );
    }
}
