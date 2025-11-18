<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, useWindowDimensions, ActivityIndicator, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

type Props = { category?: string };
type Product = { id: number; title: string; price: number; description: string; thumbnail: string; category: string };
=======
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TTL = 30 * 60 * 1000; // 30 menit

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
>>>>>>> day15

  const loadCache = async () => {
    const cached = await AsyncStorage.getItem("@app:category");
    if (cached) {
      const { value, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < TTL) {
        setProducts(value);
        setLoading(false);
        return true;
      }
    }
    return false;
  };

<<<<<<< HEAD
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
=======
  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=5");
      const json = await res.json();
      await AsyncStorage.setItem(
        "@app:category",
        JSON.stringify({ value: json.products, timestamp: Date.now() })
      );
      setProducts(json.products);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const run = async () => {
      const ok = await loadCache();
      if (!ok) await fetchProducts();
    };
    run();
  }, []);

  const addToCart = async (item: any) => {
    try {
      await AsyncStorage.mergeItem("@app:cart", JSON.stringify({ [item.id]: item }));
      Alert.alert("Ditambahkan ke keranjang");
    } catch (err: any) {
      if (err.message.includes("QuotaExceeded")) {
        Alert.alert("Error", "Penyimpanan penuh!");
      }
    }
  };

  if (loading) return <Text>Loading...</Text>;
>>>>>>> day15

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
<<<<<<< HEAD
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { id: item.id })}>
            <View style={styles.card}>
              <Image source={{ uri: item.thumbnail }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text>{currency(item.price * 1000)}</Text>
              {item.description ? <Text numberOfLines={2}>{item.description}</Text> : null}
            </View>
          </TouchableOpacity>
=======
          <View style={{ margin: 8 }}>
            <Text>{item.title}</Text>
            <Button title="Tambah ke Cart" onPress={() => addToCart(item)} />
          </View>
>>>>>>> day15
        )}
      />
    </View>
  );
}
