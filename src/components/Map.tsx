import React, { useRef, useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import Loading from '../screens/LoadingScreen';
import FabButton from './Fab';

interface Props {
    markers?: Marker[]
}

const Map = () => {

    const { hasLocation, initialPosition, getCurrentLocation, followUserLocation, currentLocation, stopFollowLocation, routesLines } = useLocation();
    const mapViewRef = useRef<MapView>();
    const following = useRef<boolean>(true);
    const [ showPolylines, setShwoPolylines ] = useState(true);

    useEffect(() => {
        followUserLocation()
        // cancelar cuando se cierra la pantalla
        return () => {
            stopFollowLocation()
        }
    },[])

    useEffect(() => {
        if(!following.current) return;
        mapViewRef.current?.animateCamera({
            center: {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude
            }
        })
    },[currentLocation])

    const centerPositiion = async () => {

        const location = await getCurrentLocation();
        following.current = true;
        mapViewRef.current?.animateCamera({
            center: {
                latitude: location.latitude,
                longitude: location.longitude
            }
        })
    }

    if( !hasLocation ){
        return <Loading />
    }

    return(
        <>
            <MapView
                ref={ (ele) => mapViewRef.current = ele!}
                style={{ flex: 1}}
                provider={PROVIDER_GOOGLE} // para usar maps en ios con proveedor Google
                showsUserLocation={true}
                initialRegion={{
                    latitude: initialPosition!.latitude,
                    longitude: initialPosition!.longitude,
                    //latitude: 14.741358,
                    //longitude: -90.885663,
                    //latitudeDelta: 0.0922,
                    //longitudeDelta: 0.0421,
                    latitudeDelta: initialPosition!.latitude,
                    longitudeDelta: initialPosition!.longitude
                }}
                onTouchStart={() => following.current = false }
            >
                { showPolylines && 
                    (
                        <Polyline 
                            coordinates={routesLines}
                            strokeColor="blue"
                            strokeWidth={2}
                        />
                    )
                }
                
                {/* <Marker 
                    image={require('../assets/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title="Location"
                    description='Usted esta aca'
                    
                /> */}
            </MapView>

            <FabButton 
                iconName='compass-outline'
                onPress={ centerPositiion }
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 15
                }}
            />
            <FabButton 
                iconName='brush-outline'
                onPress={ () => setShwoPolylines(!showPolylines)}
                style={{
                    position: 'absolute',
                    bottom: 80,
                    right: 15
                }}
            />
        </>
    )
}

export default Map;