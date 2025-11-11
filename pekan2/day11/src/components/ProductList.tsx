import React, { useState } from "react";
import { initialProducts, Product } from "./Product";
import {View, Text, FlatList, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { useNavigation } from "@react-navigation/native";

const currency = (n:number) => `Rp ${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

type Props = {
    isLandscape?: boolean
    category?: string
}

export default function ProductList({isLandscape = false, category}: Props) {

    const navigation = useNavigation()
    const filtered = category ? initialProducts.filter(p => p.category.includes(category)) : initialProducts
    const [product, setProduct] = useState<Product[]>(filtered)

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={product}
        key={isLandscape ? 'h' : 'v'}
        numColumns={isLandscape ? 2 : 1}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { id: item.id })}>
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
              <Text style={styles.title}>{item.name}</Text>
              <Text>{currency(item.price)}</Text>
              {item.description ? <Text>{item.description}</Text> : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  image: { width: '100%', height: 150, borderRadius: 8, marginBottom: 8 },
  title: { fontWeight: 'bold', fontSize: 16 },
});
