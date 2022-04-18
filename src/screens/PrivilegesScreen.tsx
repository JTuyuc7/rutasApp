import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { PermissionContext } from '../context/locationContext/PermissionsContext';
import BlackButton from '../components/BlackButton';


const Privileges = () => {

    const { permissions, askPermissions } = useContext(PermissionContext)

    return(

        <>
            <View
                style={styles.container}
            >
                <Text
                    style={{ color: 'black'}}
                >Privilegios</Text>

                <BlackButton title='Get permissions' onPress={askPermissions} />

                <View>
                    <Text>{ JSON.stringify( permissions, null, 3)}</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Privileges;