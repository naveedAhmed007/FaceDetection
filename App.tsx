import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import FaceDetection, {
  FaceDetectorContourMode,
  FaceDetectorLandmarkMode,
} from 'react-native-face-detection';
const App = () => {
  //REf Variables
  const camera = useRef<Camera>(null);

  //Hooks
  const [image, setImage] = useState<string | undefined>();

  //Camera Vars
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.front;
  const options1 = {
    landmarkMode: FaceDetectorLandmarkMode.ALL,
    contourMode: FaceDetectorContourMode.ALL,
    rotation: 0,
    cameraOrientation: 'landscapeRight',
  };

  const handleInterval = async () => {
    if (camera.current !== null) {
      try {
        const buffer = await camera.current.takePhoto({});
        const faces = await FaceDetection.processImage(buffer.path, options1);
        if (faces.length > 0) {
          alert(`Total No of faces are ${faces.length}`);
        }
      } catch (error) {
        console.log('Error in handleInterval:', error);
      }
    }
  };

  useEffect(() => {
    const intervalId = setInterval(handleInterval, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {

    const getPermissions = async () => {
      try {
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log('permission==============', newCameraPermission);
      } catch (error) {
        console.log('Error in getPermissions:', error);
      }
    };
    getPermissions();
  }, []);


  if (device == null) return <ActivityIndicator />;

  return (
    <>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        ref={camera}
        isActive={true}
        photo={true}
      />
    </>
  )
}

export default App