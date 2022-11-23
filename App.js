import AppLoading from 'expo-app-loading';
import React, {useState} from 'react';
import {Text} from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import {NavigationContainer} from "@react-navigation/native";
import { useColorScheme } from 'react-native';
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import {ThemeProvider} from "styled-components/native";
import {darkTheme, lightTheme} from "./styled";

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));
const loadImages = (images) => images.map(image => {
  if(typeof image === "string"){
    return Image.prefetch(image);
  }else{
    return Asset.loadAsync(image);
  }
})

export default function App() {
  const [ready, setReady] = useState(false);
  //preloading이 끝나고 이루어져야 하는 함
  const onFinish = () => setReady(true);
  //preloading 중일 때 이루어져야 하는 함수
  const startLoading = async() => {
    const fonts = loadFonts([Ionicons.font])
    await Promise.all([...fonts])
  }
  const isDark = useColorScheme() === "dark";
  if(!ready){
    return <AppLoading
        startAsync={startLoading}
        onFinish={onFinish}
        onError={console.error}
    />;
  }
  // return <Text>We are done loading!</Text>;
  return (
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          {/*<Tabs />*/}
          {/*<Stack/>*/}
          <Root/>
        </NavigationContainer>
      </ThemeProvider>
  );
}

//hook을 사용하는 기법
// export default function App() {
//   const [loaded] = Font.useFonts(Ionicons.font)
//   if(!loaded){
//     return <AppLoading/>;
//   }
//   return <Text>We are done Loading</Text>;
// }
