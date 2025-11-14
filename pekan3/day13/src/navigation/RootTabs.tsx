import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screen/ProfileScreen";
import HomeStack from "./HomeStack";


const Tab = createBottomTabNavigator()

export default function RootTabs() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeStack" component={HomeStack}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}