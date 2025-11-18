import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
<<<<<<< HEAD
import { enableScreens } from 'react-native-screens';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import ErrorBoundary from "./src/components/ErrorBoundary";
import GlobalProvider from "./src/components/GlobalContext";

export default function App() {
  enableScreens();
  return (
    <ErrorBoundary>
      <GlobalProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </GlobalProvider>
    </ErrorBoundary>
=======
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screen/LoginScreen"
import HomeScreen from "./src/screen/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const loadStartup = async () => {
      const values = await AsyncStorage.multiGet([
        "@app:token",
        "@app:theme",
        "@app:notif",
      ]);
      const map = Object.fromEntries(values);
      setInitialRoute(map["@app:token"] ? "Home" : "Login");
      console.log("Startup multiGet:", map);
    };
    loadStartup();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
>>>>>>> day15
  );
}
