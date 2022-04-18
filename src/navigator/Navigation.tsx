import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import Privileges from '../screens/PrivilegesScreen';
import { PermissionContext } from '../context/locationContext/PermissionsContext';
import Loading from '../screens/LoadingScreen';

const Stack = createStackNavigator();

const Navigation = () => {

    const { permissions } = useContext(PermissionContext);

    if( permissions.locationStatus === 'unavailable' ){
        return <Loading />
    }

    return(
        <Stack.Navigator
            initialRouteName='PrivilegesScreen'
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
            
        >
            {
                (permissions.locationStatus === 'granted')  
                    ? <Stack.Screen name="HomeScreen" component={HomeScreen} />
                    : <Stack.Screen name="PrivilegesScreen" component={Privileges} />
            }
            
        </Stack.Navigator>
    )
}

export default Navigation;