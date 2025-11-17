import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Button, Text, View } from "react-native";

export default function DetailScreen({ navigation, route }) {
  const { id } = route.params || {};

  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.getParent()?.navigate('MainTabs', { lockDrawer: true });
      return () => {
        navigation.getParent()?.getParent()?.navigate('MainTabs', { lockDrawer: false });
      };
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Detail Produk {id}</Text>

      <Button
        title="Reset Ke TopTabs"
        onPress={() => navigation.reset({ index: 0, routes: [{ name: 'TopTabs' }] })}
      />

      <Button
        title="Kembali Ke Drawer Home"
        onPress={() => navigation.getParent()?.getParent()?.reset({ index: 0, routes: [{ name: 'MainTabs' }] })}
      />

      <Button
        title="Checkout"
        onPress={() => navigation.navigate('Checkout')}
      />
    </View>
  );
}
