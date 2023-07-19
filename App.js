import OneSignal from 'react-native-onesignal'
import { StyleSheet, View} from 'react-native';
import { WebView } from 'react-native-webview';
import {ActivityIndicator} from 'react-native'

export default function App() {
  OneSignal.setAppId("5c949a3d-a19c-482c-a6fb-535df8985e08");
  OneSignal.promptForPushNotificationsWithUserResponse();
  OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
    console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
    let notification = notificationReceivedEvent.getNotification();
    console.log("notification: ", notification);
    const data = notification.additionalData
    console.log("additionalData: ", data);
    notificationReceivedEvent.complete(notification);
  });
  
  OneSignal.setNotificationOpenedHandler(notification => {
    console.log("OneSignal: notification opened:", notification);
  });
  var url = "https://lucasyessir.wixsite.com/mercadao/"; 

  return (
        <View style={styles.webview}>
          <WebView
            source = {{uri : url}}
            setBuiltInZoomControls={false}
            startInLoadingState
            renderLoading={() =>(
              <View style={{flex:1}}>
                <ActivityIndicator size='large' color="lightskyblue"/>
              </View>
            )}
          />
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#964b00',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    textAlign: "right"
  },

  webview: {
    width: '100%',
    height: '100%',
    //flex: 1
    //borderWidth: 5, borderColor: '#964b00'
  },
});
