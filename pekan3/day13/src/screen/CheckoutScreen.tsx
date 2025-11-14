import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { Button, Text, View } from "react-native";

export default function CheckoutScreen({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      navigation.getParent()?.getParent()?.navigate('MainTabs', { lockDrawer: true });
      return () => {
        navigation.getParent()?.getParent()?.navigate('MainTabs', { lockDrawer: false });
      };
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Checkout</Text>
      <Text>Ini layar modal untuk Checkout</Text>

      <Button title="Tutup" onPress={() => navigation.goBack()} />
    </View>
  );
}
