import React from 'react';
import { Text, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
    title: string;
    onPress: () => void;
}

const { width, height } = Dimensions.get('screen');

const BlackButton = ({title = 'Press button', onPress}: Props) => {

    return(
        <>
            <TouchableOpacity
                activeOpacity={0.7}
                style={styles.buttonContainer}
                onPress={onPress}
            >
                <Text
                    style={styles.textButton}
                >{title}</Text>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#000",
        height: 50,
        width: width * 0.8,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.3,
        elevation: 6
    },
    textButton: {
        color: '#e1e1e1',
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default BlackButton;