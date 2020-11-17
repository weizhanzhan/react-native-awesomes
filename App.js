/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Platform,
  Modal,
  Alert,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {RNCamera as Camera} from 'react-native-camera';
import {
  Header,
  // LearnMoreLinks,
  Colors,
  // DebugInstructions,
  // ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="Go to Camera"
        onPress={() => navigation.navigate('Camera')}
      />
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

function CameraScreen() {
  const [camera, setCamera] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      alert(data.uri);
    }
  };

  //切换前后摄像头
  const switchCamera = () => {
    if (cameraType === Camera.Constants.Type.back) {
      setCameraType(Camera.Constants.Type.front);
    } else {
      setCameraType(Camera.Constants.Type.back);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        type={cameraType}
        style={styles.preview}
        ref={(cam) => {
          setCamera(cam);
        }}
        flashMode={Camera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}>
        <Text style={styles.button} onPress={switchCamera}>
          [切换摄像头]
        </Text>

        <TouchableOpacity
          onPress={() => {
            takePicture();
          }}
          style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const App = () => {
  // const [modalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // 添加这一行会实现安卓下页面的左右切换，默认是从下到上
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} extraData={{name: 'weizhan'}} />}
        </Stack.Screen>
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <>
    //   <StatusBar barStyle="dark-content" />
    //   <SafeAreaView>
    //     <ScrollView
    //       contentInsetAdjustmentBehavior="automatic"
    //       style={styles.scrollView}>
    //       <Header />
    //       {global.HermesInternal == null ? null : (
    //         <View style={styles.engine}>
    //           <Text style={styles.footer}>Engine: Hermes</Text>
    //         </View>
    //       )}
    //       <View style={styles.body}>
    //         <Text>你好啊</Text>
    //         <ActivityIndicator size="large" color="#0000ff" />
    //         <Button
    //           title="Learn More"
    //           color="#841584"
    //           accessibilityLabel="Learn more about this purple button"
    //         />
    //         <KeyboardAvoidingView
    //           behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //           style={styles.container}>
    //           <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    //             <View style={styles.inner}>
    //               <Text style={styles.header}>键盘</Text>
    //               <TextInput placeholder="Username" style={styles.textInput} />
    //               <View style={styles.btnContainer}>
    //                 <Button title="Submit" onPress={() => null} />
    //               </View>
    //             </View>
    //           </TouchableWithoutFeedback>
    //         </KeyboardAvoidingView>
    //         <View style={styles.centeredView}>
    //           <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => {
    //               Alert.alert('Modal has been closed.');
    //             }}>
    //             <View style={styles.centeredView}>
    //               <View style={styles.modalView}>
    //                 <Text style={styles.modalText}>Hello World!</Text>

    //                 <TouchableHighlight
    //                   style={{...styles.openButton, backgroundColor: '#2196F3'}}
    //                   onPress={() => {
    //                     setModalVisible(!modalVisible);
    //                   }}>
    //                   <Text style={styles.textStyle}>Hide Modal</Text>
    //                 </TouchableHighlight>
    //               </View>
    //             </View>
    //           </Modal>

    //           <TouchableHighlight
    //             style={styles.openButton}
    //             onPress={() => {
    //               setModalVisible(true);
    //             }}>
    //             <Text style={styles.textStyle}>Show Modal</Text>
    //           </TouchableHighlight>
    //         </View>
    //         <View>
    //           <Camera
    //             type={cameraType}
    //             ref={(cam) => {
    //               setCamera(cam);
    //             }}>
    //             <Text style={styles.button}>[切换摄像头]</Text>
    //             <Text style={styles.button}>[拍照]</Text>
    //           </Camera>
    //         </View>
    //         <Text>你好啊</Text>
    //         <Text>你好啊</Text>
    //         <Text>你好啊</Text>
    //         <Text>你好啊</Text>
    //         <Text>你好啊</Text>
    //       </View>
    //     </ScrollView>
    //   </SafeAreaView>
    // </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default App;
