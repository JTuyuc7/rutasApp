import React, { createContext, useState, useEffect } from 'react';
import { Platform, AppState } from 'react-native';
import { PermissionStatus, check, request, PERMISSIONS, openSettings } from 'react-native-permissions';

export interface PermissionsState {
    locationStatus: PermissionStatus
}

export const permissionInitState: PermissionsState = {
    locationStatus: 'unavailable'
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askPermissions: () => void;
    checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermissionsContextProps) // definir que exportara

export const PermissionsProvider = ({children}: any) => {

    const [ permissions, setPermissions ] = useState(permissionInitState);

    useEffect(() => {
        AppState.addEventListener('change', (state) => {
            if( state !== 'active' ) return;

            checkLocationPermission();
        })
    },[])

    const askPermissions = async () => {
        let permissionStatus: PermissionStatus;

        if(Platform.OS === 'ios'){
            //permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        }else {
            //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        }

        if(permissionStatus === 'blocked'){
            openSettings()
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    const checkLocationPermission = async () => {
        let permissionStatus: PermissionStatus;

        if(Platform.OS === 'ios'){
            //permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
        }else {
            //permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
        }

        setPermissions({
            ...permissions,
            locationStatus: permissionStatus
        });
    }

    return(
        <PermissionContext.Provider
            value={{
                permissions,
                askPermissions,
                checkLocationPermission,
            }}
        >
            {children}
        </PermissionContext.Provider>
    )
}