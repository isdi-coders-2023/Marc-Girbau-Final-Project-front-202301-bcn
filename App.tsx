import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import { Provider } from "react-redux";
import LoginScreen from "./src/screen/LoginScreen/LoginScreen";
import { store } from "./src/store/store";
import globalStyles from "./src/styles/globalStyles";
import Loader from "./src/components/Loader/Loader";

const App = (): JSX.Element => (
  <Provider store={store}>
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={globalStyles.screen}>
        <Loader />
        <LoginScreen />
      </View>
      <StatusBar style="light" />
    </SafeAreaView>
  </Provider>
);

export default App;
