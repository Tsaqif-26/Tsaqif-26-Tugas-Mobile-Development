import React from "react";
import { View, Button } from "react-native";
import ProductList from "../components/ProductList";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }: any) {
  const onLogout = async () => {
    await AsyncStorage.multiRemove([
      "@app:token",
      "@app:theme",
      "@app:notif",
      "@app:cart",
      "@app:category",
    ]);
    navigation.replace("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <ProductList />
      <Button title="Logout" onPress={onLogout} />
    </View>
  );
}
