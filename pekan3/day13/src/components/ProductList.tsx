import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

type Props = { category?: string };

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
};

const currency = (n: number) => `Rp ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export default function ProductList({ category }: Props) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offline, setOffline] = useState<boolean>(false);
  const [netState, setNetState] = useState<NetInfoState | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const run = async () => {
      setLoading(true);
      const state = await NetInfo.fetch();
      setNetState(state);

      if (!state.isInternetReachable) {
        setOffline(true);
        setLoading(false);
        return;
      }
      setOffline(false);

      timeoutRef.current = setTimeout(() => {
        controller.abort();
      }, 7000);

      try {
        const res = await fetch('https://dummyjson.com/products?limit=100', { signal: controller.signal });
        const json = await res.json();

        if (!isMounted) return;

        const items: Product[] = json?.products ?? [];
        const filtered = category
          ? items.filter(p => {
              if (category === 'Populer') {
                return (p as any)?.rating >= 4.5;
              }
              return p.category?.toLowerCase().includes(category.toLowerCase());
            })
          : items;

        setProducts(filtered);
      } catch (err: any) {
        if (err?.name === 'AbortError') {
          console.warn('Fetch aborted due to timeout or unmount');
        } else {
          console.error('Fetch error:', err?.message || err);
        }
      } finally {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        if (isMounted) setLoading(false);
      }
    };

    run();

    return () => {
      isMounted = false;
      controller.abort();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [category]);

  const columnWrapperStyle = useMemo(
    () => (isLandscape ? { justifyContent: 'space-between', paddingHorizontal: 12 } : undefined),
    [isLandscape]
  );

  if (offline) {
    return (
      <View style={styles.center}>
        <Text style={styles.offline}>Anda sedang Offline. Cek koneksi Anda.</Text>
        <Text style={styles.connection}>Jenis koneksi: {netState?.type ?? 'unknown'}</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Memuat produk...</Text>
        <Text style={styles.connection}>Jenis koneksi: {netState?.type ?? 'unknown'}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={products}
        key={isLandscape ? 'h' : 'v'}
        numColumns={isLandscape ? 2 : 1}
        columnWrapperStyle={columnWrapperStyle}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text>{currency(item.price * 1000)}</Text>
              {item.description ? <Text numberOfLines={2}>{item.description}</Text> : null}
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <View style={{ padding: 12 }}>
            <Text style={styles.connection}>Jenis koneksi: {netState?.type ?? 'unknown'}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: 'white' },
  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 8, backgroundColor: '#eee' },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  offline: { fontSize: 16, marginBottom: 8, color: 'tomato' },
  connection: { marginTop: 8, color: '#666' },
});
