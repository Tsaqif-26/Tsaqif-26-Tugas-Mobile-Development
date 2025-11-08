//@ts-ignore
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProductList from "../components/ProductList";
import ProfileScreen from "../screen/ProfileScreen";



const Tab = createBottomTabNavigator()

export default function MainTabs() {

    return (
        <Tab.Navigator screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {let iconName = route.name === 'Catalog' ? 'list' : 'person' 
                return <Ionicons name={focused ? iconName: `${iconName}-outline`} size={size} color={color}/>
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
            headerShown: false
        })}>

            <Tab.Screen name="Catalog" component={ProductList}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>

        </Tab.Navigator>
    )
}