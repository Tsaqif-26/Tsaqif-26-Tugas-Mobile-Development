import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import apiClient from '../service/apiClient';

export default function LoginScreen() {
  const [username, setUsername] = useState('kminchelle');
  const [password, setPassword] = useState('dummy');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/login', { username, password });
      const data = res?.data;
      if (data?.success) {
        console.log('Token:', data.token);
        Alert.alert('Login sukses', `Token: ${data.token}`);
      } else {
        Alert.alert('Login gagal', 'Periksa kredensial');
      }
    } catch (err: any) {
      Alert.alert('Error', err?.message || 'Terjadi kesalahan');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 12 }}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12 }}
      />
      <Button title={loading ? 'Memproses...' : 'Masuk'} onPress={onSubmit} disabled={loading} />
    </View>
  );
}
