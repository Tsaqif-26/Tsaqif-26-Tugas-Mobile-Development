// src/context/GlobalContext.tsx
import React, { createContext, useEffect, useState } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import { View, Text } from 'react-native';

export const GlobalContext = createContext<{ netState: NetInfoState | null }>({ netState: null });

export default function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [netState, setNetState] = useState<NetInfoState | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetState(state);
      if (!state.isInternetReachable) {
        console.log("Koneksi terputus. Menggunakan mode offline.");
      } else {
        console.log("Koneksi pulih. Melanjutkan operasi.");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <GlobalContext.Provider value={{ netState }}>
      <View style={{ flex: 1 }}>
        {netState && !netState.isInternetReachable && (
          <View style={{ backgroundColor: 'tomato', padding: 8 }}>
            <Text style={{ color: 'white' }}>Koneksi terputus. Menggunakan mode offline.</Text>
          </View>
        )}
        {children}
      </View>
    </GlobalContext.Provider>
  );
}
