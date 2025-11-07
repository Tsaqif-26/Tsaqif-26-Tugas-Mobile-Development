import { SafeAreaView } from "react-native-safe-area-context";
import ProductList from "./src/components/ProductList";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function App() {

    const {width, height} = useWindowDimensions()
    const isLandscape = width > height

  return(
    <SafeAreaView style={styles.container} edges={['top','bottom','left','right']}>
      <ProductList isLandscape={isLandscape}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white'}
})