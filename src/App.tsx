import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {NavigationContainer} from '@react-navigation/native';

// import {checkVersion} from 'react-native-check-version';
import {useEffect, useState} from 'react';
import React from 'react';
import {Alert, PermissionsAndroid, Platform, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import messaging from '@react-native-firebase/messaging';

//Dòng dưới này quan trọng không được xoá đi
const Stack = createNativeStackNavigator();
// const Stack = createNativeStackNavigator(); // cái gì quan trọng thì viết 2 lần
// 2 Dòng trên này quan trọng không được xoá đi
const MiniAppScreen = React.lazy(() => import('miniApp/CtnMini'));
function App() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    // Gom tất cả logic về FCM vào một hàm để dễ quản lý
    const setupCloudMessaging = async () => {
      // 1. Xin quyền từ người dùng
      if (Platform.OS === 'ios') {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      } else if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      }

      // 2. (QUAN TRỌNG) Đăng ký thiết bị với APNs (iOS) / FCM (Android)
      // Chờ cho đến khi quá trình này hoàn tất.
      // console.log('registerDeviceForRemoteMessages');
      // await messaging().registerDeviceForRemoteMessages();
      // console.log('end registerDeviceForRemoteMessages');

      // 3. Lấy token SAU KHI đã đăng ký thành công
      try {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
      } catch (error) {
        console.error(error);
      }
      // Gửi token này về server của bạn
    };

    setupCloudMessaging();

    // Lắng nghe sự kiện token được làm mới
    const unsubscribeTokenRefresh = messaging().onTokenRefresh(token => {
      console.log('New FCM Token:', token);
      // Gửi token mới về server của bạn
    });

    // Lắng nghe sự kiện nhận message khi app đang mở
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', remoteMessage);
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    try {
      // Xử lý khi người dùng nhấn vào thông báo
      messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
      });

      // Xử lý khi app được mở từ một thông báo (lúc app đã tắt)
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
          }
        });
    } catch (error) {
      console.log('error', error);
    }
    // Hủy đăng ký các listener khi component unmount
    return () => {
      unsubscribeTokenRefresh();
      unsubscribeOnMessage();
    };
  }, []);
  useEffect(() => {
    // checkVersionApp();
  }, []);

  // const checkVersionApp = async () => {
  //   try {
  //     const version = await checkVersion();
  //     if (version.needsUpdate) {
  //       console.log(`App has a ${version.updateType} update pending.`);
  //       setVisible(true);
  //     } else {
  //       console.log('App is up to date.');
  //       setVisible(false);
  //     }
  //   } catch (error) {}
  // };
  return (
    <SafeAreaProvider>
      <React.Suspense fallback={<View></View>}>
        <MiniAppScreen />
      </React.Suspense>
    </SafeAreaProvider>
  );
}

export default App;
