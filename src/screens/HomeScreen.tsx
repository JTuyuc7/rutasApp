import React, { useEffect } from 'react';
import { View } from 'react-native';
import Map from '../components/Map';

const HomeScreen = () => {

    return(
        <>
            <View style={{ flex: 1}}>
                <Map />
            </View>
        </>
    )
};

export default HomeScreen;