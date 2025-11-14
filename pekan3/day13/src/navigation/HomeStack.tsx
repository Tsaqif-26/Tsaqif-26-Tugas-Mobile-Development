import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "../screen/HomeTabs";
import DetailScreen from "../screen/DetailScreen";
import CheckoutScreen from "../screen/CheckoutScreen";
import LoginScreen from "../screen/LoginScreen";
import CartScreen from "../screen/CartScreen";
import { Button, TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TopTabs"
        component={HomeTabs}
        options={({ navigation }) => ({
          headerShown: true,
          title: 'Produk',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.getParent()?.dispatch(DrawerActions.toggleDrawer())} style={{ paddingHorizontal: 12 }}>
              <Ionicons name="menu" size={22} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
          ),
        })}
      />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ presentation: 'modal', headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
}
