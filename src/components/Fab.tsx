import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    iconName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const FabButton = ({ iconName, onPress, style = {} } : Props) => {

    return(
        <>
            <View
                style={{...style as any, }}
            >
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onPress}
                    style={styles.blackButton}
                >
                    <Icon name={iconName} size={20} color='white' />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 9999,
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5
        },
        elevation: 5,
        shadowOpacity: 0.8,
        shadowRadius: 4.95
    }
})

export default FabButton;