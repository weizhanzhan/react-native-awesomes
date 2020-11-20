import React, {useState} from 'react';
import {RNCamera as Camera} from 'react-native-camera';

import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
function CameraScreen() {
  const [camera, setCamera] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      Alert.alert(data.uri);
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
const styles = StyleSheet.create({
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

export default CameraScreen;
