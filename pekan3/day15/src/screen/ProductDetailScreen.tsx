import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';
import apiClient from '../service/apiClient';
import Toast from 'react-native-toast-message';

export default function ProductDetailScreen({ route }) {
  const { id } = route.params;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await apiClient.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err: any) {
        setLoading(false);
        if (err.response?.status === 404) {
          console.error("Error 404: Not Found");
        } else if (err.response?.status === 500) {
          console.error("Error 500: Internal Server Error");
        }
        Toast.show({
          type: 'error',
          text1: 'Gagal memuat data terbaru. Menampilkan versi arsip.'
        });
        // fallback data lokal
        setProduct({
          title: "Produk Arsip",
          thumbnail: "https://via.placeholder.com/150"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  image: { width: 200, height: 200, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: 'bold' }
});
