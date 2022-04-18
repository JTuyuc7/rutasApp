import React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = () => {

    return(
        <>
            <View
                style={styles.container}
            >
                <ActivityIndicator size={45} color="#5856d6" />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1e1e1',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading;