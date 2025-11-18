import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import apiClient from '../service/apiClient';

export default function CheckoutScreen() {
  const [alamat, setAlamat] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async () => {
    try {
      const res = await apiClient.post('/checkout', { alamat });
      console.log("Checkout sukses:", res.data);
    } catch (err: any) {
      if (err.response?.status === 400) {
        const msg = err.response.data.errors?.field || "Validasi gagal";
        setErrorMsg(msg);
      }
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Alamat"
        value={alamat}
        onChangeText={setAlamat}
        style={{ borderWidth: 1, borderColor: '#ccc', marginBottom: 8, padding: 8 }}
      />
      {errorMsg ? <Text style={{ color: 'red' }}>{errorMsg}</Text> : null}
      <Button title="Kirim" onPress={onSubmit} />
    </View>
  );
}
