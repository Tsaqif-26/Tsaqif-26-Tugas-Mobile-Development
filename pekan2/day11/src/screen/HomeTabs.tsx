import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProductList from "../components/ProductList";

const Tab = createMaterialTopTabNavigator();

export default function HomeTabs() {

    return (
        <Tab.Navigator screenOptions={{
            tabBarScrollEnabled: true,
            lazy:true,
            lazyPreloadDistance: 1,
            tabBarItemStyle: {width: 120},
            tabBarIndicatorStyle: {backgroundColor:'blue', height: 3},
            tabBarLabelStyle: {textTransform: 'none'}
        }}>

            <Tab.Screen name="Makanan">
                {() => <ProductList category="Makanan" />}
            </Tab.Screen>

            <Tab.Screen name="Minuman">
                {() => <ProductList category="Minuman" />}
            </Tab.Screen>

            <Tab.Screen name="Populer">
                {() => <ProductList category="Populer" />}
            </Tab.Screen>


        </Tab.Navigator>
    )
}

import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
function ProductListWithLog() {
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      console.log('Diskon tab aktif');
      return () => console.log('Diskon tab ditinggalkan');
    }
  }, [isFocused]);
  return <ProductList />;
}