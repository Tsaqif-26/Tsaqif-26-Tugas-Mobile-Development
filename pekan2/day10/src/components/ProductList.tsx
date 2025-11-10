import React from 'react';
import { useState } from "react";
import { initialProducts, Product } from "./Product";
import {
  View, Text, FlatList, Image, TouchableOpacity,
  Modal, TextInput, Alert, StyleSheet
} from 'react-native';

const currency = (n:number) => `Rp ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

type Props = {
    isLandscape?: boolean
    category?: string
}

export default function ProductList({isLandscape = false, category}: Props) {

 const filtered = category
  ? initialProducts.filter(p => p.category === category)
  : initialProducts;

  const [products, setProducts] = useState<Product[]>(filtered);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState('');
  const [priceText, setPriceText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const validate = () => {
    if(!name.trim() || !priceText.trim() || !imageUrl.trim()) {
      Alert.alert('Wajib diisi kecuali deskripsi!!');
      return false;
    }
    if(!/^\d+$/.test(priceText)) {
      Alert.alert('Harga harus angka');
      return false;
    }
    return true;
  };

  const addProduct = () => {
    if(!validate()) return;
    const newProduct: Product = {
      id:`p${products.length + 1}-${Date.now()}`,
      name,
      price: Number(priceText),
      imageUrl,
      description
    };
    setProducts([...products, newProduct]);
    setModalVisible(false);
    setName(''); setPriceText(''); setImageUrl(''); setDescription('');
  };

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={{ color: '#fff' }}>+ Tambah Produk</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        key={isLandscape ? 'h' : 'v'}
        numColumns={isLandscape ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            <Text>{currency(item.price)}</Text>
            {item.description ? <Text>{item.description}</Text> : null}
          </View>
        )}
      />

      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, padding: 16 }}>
          <TextInput placeholder="Nama Produk" value={name} onChangeText={setName} style={styles.input}/>
          <TextInput placeholder="Harga" value={priceText} onChangeText={setPriceText} keyboardType="number-pad" style={styles.input}/>
          <TextInput placeholder="URL Gambar" value={imageUrl} onChangeText={setImageUrl} style={styles.input}/>
          <TextInput placeholder="Deskripsi" value={description} onChangeText={setDescription} style={styles.input}/>
          <TouchableOpacity style={styles.addButton} onPress={addProduct}>
            <Text style={{ color: '#fff' }}>Simpan</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text style={{ textAlign: 'center', marginTop: 12 }}>Tutup</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: '#2563EB',
    padding: 12,
    margin: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  card: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    padding: 12, marginBottom: 12,
  },
  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 10,
  },
});
