import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTabs from "../screen/HomeTabs";
import DetailScreen from "../screen/DetailScreen";


const Stack = createNativeStackNavigator()

export default function HomeStack() {

    return(
        <Stack.Navigator>
            <Stack.Screen name="TopTabs" component={HomeTabs} options={{headerShown: true, title: 'Produk'}}/>
            <Stack.Screen name="Detail" component={DetailScreen}/>
        </Stack.Navigator>
    )
}