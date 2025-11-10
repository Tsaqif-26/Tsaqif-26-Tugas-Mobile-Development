import { createNativeStackNavigator } from "@react-navigation/native-stack"
import DrawerNavigator from "./DrawerNavigator";


const Stack = createNativeStackNavigator();

export default function RootStack() {

    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Main" component={DrawerNavigator}/>
        </Stack.Navigator>
    )
}