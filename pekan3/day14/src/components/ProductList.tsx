import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

type Props = { category?: string };
type Product = { id: number; title: string; price: number; description: string; thumbnail: string; category: string };

const currency = (n: number) => `Rp ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export default function ProductList({ category }: Props) {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [offline, setOffline] = useState<boolean>(false);
  const [netState, setNetState] = useState<NetInfoState | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWithRetry = async (url: string, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
      } catch (err) {
        if (i < retries - 1) {
          await new Promise(r => setTimeout(r, delay * Math.pow(2, i))); 
        } else {
          throw err;
        }
      }
    }
  };

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const state = await NetInfo.fetch();
      setNetState(state);
      if (!state.isInternetReachable) {
        setOffline(true);
        setLoading(false);
        return;
      }
      setOffline(false);

      const json = await fetchWithRetry('https://dummyjson.com/products?limit=100');
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
      setError("Gagal memuat produk");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
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
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
        <Button title="Coba Lagi Manual" onPress={loadProducts} />
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
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item.id })}>
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text>{currency(item.price * 1000)}</Text>
              {item.description ? <Text numberOfLines={2}>{item.description}</Text> : null}
            </View>
          </TouchableOpacity>
        )}
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
