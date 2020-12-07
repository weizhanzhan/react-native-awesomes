/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  SectionList,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const Stack = createStackNavigator();

const CameraLazy = React.lazy(() => {
  return import(/* webpackChunkName:'CameraLazy'*/ './app/components/Camera');
});

// import CameraLazy from './components/Camera.js';
const DATA = [
  {
    title: '组件',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'API',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: '功能',
    data: ['camera', '推送'],
  },
];
const Item = ({title}) => (
  <View
    style={styleHome.item}
    onPress={() => {
      Alert.alert(title);
    }}>
    <Text style={styleHome.title}>{title}</Text>
  </View>
);

const styleHome = StyleSheet.create({
  item: {
    backgroundColor: '#fafafa',
    paddingStart: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebedf0',
    // marginVertical: 8,
  },
  header: {
    fontSize: 22,
    paddingStart: 10,
    paddingTop: 10,

    backgroundColor: '#fff',
    color: 'rgba(69, 90, 100, 0.6)',
  },
  title: {
    fontSize: 16,
    color: '#323233',
  },
});
function HomeScreen({navigation}) {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Button
          title="Go to Camera   "
          onPress={() => navigation.push('Camera')}
        />
        <SectionList
          style={styles.body}
          ListHeaderComponent={<Header />}
          sections={DATA}
          onPress={() => {
            alert('23');
          }}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <Item
              onPress={() => {
                alert('23');
              }}
              title={item}
            />
          )}
          renderSectionHeader={({section: {title}}) => (
            <Text style={styleHome.header}>{title}</Text>
          )}
        />
      </SafeAreaView>
    </>
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
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 300);
  }, []);
  if (!visible) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <React.Suspense fallback={<Text>Loading</Text>}>
      <CameraLazy />
    </React.Suspense>
  );
}

const App = () => {
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
    justifyContent: 'center',
    alignItems: 'center',
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
