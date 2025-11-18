import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen() {
  const [cart, setCart] = useState<any>({});

  useEffect(() => {
    const loadCart = async () => {
      const raw = await AsyncStorage.getItem('@app:cart');
      if (raw) setCart(JSON.parse(raw));
    };
    loadCart();
  }, []);

  const addItem = async () => {
    try {
      const newItem = { productId: 1, qty: 2 };
      await AsyncStorage.mergeItem('@app:cart', JSON.stringify(newItem));
      setCart((prev: any) => ({ ...prev, ...newItem }));
    } catch (err: any) {
      if (err.message.includes('QuotaExceeded')) {
        Alert.alert('Error', 'Penyimpanan penuh!');
      }
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>Keranjang: {JSON.stringify(cart)}</Text>
      <Button title="Tambah Item" onPress={addItem} />
    </View>
  );
}
