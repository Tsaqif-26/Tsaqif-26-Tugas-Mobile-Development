import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import apiClient from '../service/apiClient';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export default function CartScreen() {
  const [total, setTotal] = useState<number>(0);
  const [netState, setNetState] = useState<NetInfoState | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;

    const startPolling = (state: NetInfoState) => {
      if (state.type === 'cellular') {
        console.log('Polling dihentikan: koneksi cellular');
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }

      intervalRef.current = setInterval(async () => {
        try {
          const res = await apiClient.get('/carts/user/1');
          const data = res?.data;
          const newTotal = data?.total ?? 0;
          if (isMounted) setTotal(newTotal);
          console.log('Polling cart total:', newTotal);
        } catch (err: any) {
          console.error('Polling error:', err?.message || err);
        }
      }, 15000);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetState(state);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      startPolling(state);
    });

    NetInfo.fetch().then((state) => {
      setNetState(state);
      startPolling(state);
    });

    return () => {
      isMounted = false;
      unsubscribe();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 22, marginBottom: 8 }}>Keranjang</Text>
      <Text style={{ fontSize: 18 }}>Total belanja: Rp {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
      <Text style={{ marginTop: 12, color: '#666' }}>Jenis koneksi: {netState?.type ?? 'unknown'}</Text>
      {netState?.type === 'cellular' ? (
        <Text style={{ marginTop: 4, color: 'tomato' }}>Polling dimatikan untuk hemat kuota.</Text>
      ) : null}
    </View>
  );
}
