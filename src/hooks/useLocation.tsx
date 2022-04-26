import { useEffect, useState, useRef } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Location } from '../interfaces/locationInterfaces';

export const useLocation = () => {

    const [ hasLocation, setHasLocation ] = useState(false);
    const [ routesLines, setRoutesLines ] = useState<Location[]>([]);
    const [ initialPosition, setInitialPosition ] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const [ currentLocation, setCurrentLocation ] = useState<Location>({
        latitude: 0,
        longitude: 0
    });

    const watchId = useRef<number>()
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {
        getCurrentLocation()
            .then( (location) => {
                if(!isMounted.current) return;
                setInitialPosition(location);
                setCurrentLocation(location);
                setRoutesLines( (routes) => [...routes, location])
                setHasLocation(true);
            }).catch((err) => {
                console.log(err, 'Unable to resolve location');
            })
    },[]);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise( (resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {

                    if(!isMounted.current) return;
                    const location: Location = {
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    }
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    });
                    setRoutesLines( (routes) => [...routes, location])
                },
                (err) => reject({err}),
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 1000
                }
            )
        })  
    };

    const followUserLocation = () => {
        watchId.current = Geolocation.watchPosition(
            ({coords}) => {
                console.log(coords, 'coordenadas');
                setCurrentLocation({
                    latitude: coords.latitude,
                    longitude: coords.longitude
                })
            },
            (err) => console.log(err, 'error'),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 1000,
                distanceFilter: 10
            }
        )
    }

    const stopFollowLocation = () => {
        if( watchId.current ){
            Geolocation.clearWatch(watchId.current)
        }
    }

    return {
        routesLines,
        hasLocation,
        initialPosition,
        currentLocation,
        getCurrentLocation,
        followUserLocation,
        stopFollowLocation
    }
}