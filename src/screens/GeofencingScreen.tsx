import React, {useEffect, useState} from 'react';

import {Screen} from '../components/common/Screen';
import BackgroundGeolocation from 'react-native-background-geolocation';
import MapView, {Circle} from 'react-native-maps';
import styled from 'styled-components/native';

import notifee from '@notifee/react-native';
import axios from 'axios';
import {TopMenu} from '../components/common/TopMenu';
import {Button} from '../components/common/Button';
import {useNavigation} from '../navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GeofencingScreen = (): JSX.Element => {
  const {goBack} = useNavigation();

  const [myNoti, setMyNoti] = useState([]);
  const [markerSpot, setMarkerSpot] = useState<{lat: number; lng: number}[]>(
    [],
  );

  useEffect(() => {
    const notificationSetting = async () => {
      await notifee.requestPermission();

      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
    };

    notificationSetting();
  }, []);

  useEffect(() => {
    const setGeofence = async () => {
      const client = axios.create();

      client.interceptors.request.use(async config => {
        const token = await AsyncStorage.getItem('token');

        if (!token) {
          return config;
        }

        config.baseURL = 'http://13.209.42.36:4000/api/v1';
        config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        return config;
      });

      const myNotiResponse = await client.get('/noti/my');

      console.log(myNotiResponse);
      setMyNoti(myNotiResponse.data.userNotiList);

      await myNotiResponse.data.userNotiList.forEach(
        async ({
          notiId,
          markerId,
          radius,
        }: {
          notiId: number;
          markerId: number;
          radius: number;
        }) => {
          const marker = await client.get(`/marker/${markerId}`);

          setMarkerSpot([
            ...markerSpot,
            {lat: marker.data.x, lng: marker.data.y},
          ]);

          BackgroundGeolocation.addGeofence({
            identifier: `${notiId}`,
            radius,
            latitude: marker.data.x,
            longitude: marker.data.y,
            notifyOnEntry: true,
            notifyOnExit: true,
          })
            .then(() => {
              console.log('success');
            })
            .catch(() => {
              console.log('error');
            });
        },
      );

      BackgroundGeolocation.ready(
        {
          desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
          distanceFilter: 10,
          autoSync: true,
          geofenceModeHighAccuracy: true,
          geofenceInitialTriggerEntry: true,
          debug: false,
          locationUpdateInterval: 10,
        },
        () => {
          BackgroundGeolocation.startGeofences();
        },
      );
    };

    setGeofence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (myNoti.length === 0) {
      return;
    }

    const onGeofence = BackgroundGeolocation.onGeofence(async geofence => {
      await myNoti.forEach(
        async ({notiId, message}: {notiId: number; message: string}) => {
          if (geofence.identifier === `${notiId}`) {
            if (geofence.action === 'ENTER') {
              BackgroundGeolocation.start();

              await notifee.displayNotification({
                title: '지오펜싱 알림 메시지',
                body: message,
                android: {
                  channelId: 'default',
                  smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                  // pressAction is needed if you want the notification to open the app when pressed
                  pressAction: {
                    id: 'default',
                  },
                },
              });

              const client = axios.create();

              client.interceptors.request.use(async config => {
                const token = await AsyncStorage.getItem('token');

                if (!token) {
                  return config;
                }

                config.baseURL = 'http://13.209.42.36:4000/api/v1';
                config.headers.Authorization = `Bearer ${JSON.parse(token)}`;
                return config;
              });

              await client.delete(`/noti/delete/${notiId}`);
            } else if (geofence.action === 'EXIT') {
              BackgroundGeolocation.startGeofences();
            }
          }
        },
      );
    });

    return () => {
      onGeofence.remove();
    };
  }, [myNoti]);

  return (
    <Screen>
      <TopMenu backgroundColor="#ffffff">
        <Button
          variant="icon"
          size="medium"
          onPress={() => {
            BackgroundGeolocation.stop();
            BackgroundGeolocation.removeAllListeners();
            goBack();
          }}>
          뒤로가기
        </Button>
      </TopMenu>

      <StyledMapView
        initialRegion={{
          latitude: 37.376866560792855,
          longitude: 126.63372157971573,
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        showsUserLocation
        followsUserLocation>
        {markerSpot.map(({lat, lng}, index) => (
          <Circle
            key={index}
            center={{
              latitude: lat,
              longitude: lng,
            }}
            radius={200}
            fillColor="rgba(24, 90, 255, 0.5)"
          />
        ))}
      </StyledMapView>
    </Screen>
  );
};

const StyledMapView = styled(MapView)`
  width: 100%;
  height: 100%;
`;

export default GeofencingScreen;
