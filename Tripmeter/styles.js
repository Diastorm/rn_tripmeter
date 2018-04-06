import {
    Dimensions,
    PixelRatio,
    // Platform,
    // StatusBar
} from 'react-native';

const PlatformInfo = {
    sizeObj: Dimensions.get('window'),
    pixels: 2,
    getSize: () => Dimensions.get('window'),
    width: () => {
        return PlatformInfo.sizeObj.width;
    },
    height: () => {
        // return PlatformInfo.sizeObj.height - (Platform.OS === "android" ? StatusBar.currentHeight : 0);
        return 88;
    },
    pixel: (px) => {
        if (!PlatformInfo.pixels) {
            PlatformInfo.pixels = PixelRatio.get();
        }
        return px / PlatformInfo.pixels;
    }
};

const CSS = {
    pixel: PlatformInfo.pixel,
    width: PlatformInfo.width,
    height: PlatformInfo.height
};

export { CSS, PlatformInfo };
