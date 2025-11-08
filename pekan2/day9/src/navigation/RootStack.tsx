import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding1 from "../screen/Onboarding1";
import Onboarding2 from "../screen/Onboarding2";
import MainTabs from "./MainTabs";


const Stack = createNativeStackNavigator()

export default function RootStack() {

    return(
        <Stack.Navigator initialRouteName="Onboarding1" screenOptions={{headerShown: false}}>
            <Stack.Screen name="Onboarding1" component={Onboarding1}/>
            <Stack.Screen name="Onboarding2" component={Onboarding2}/>
            <Stack.Screen name="MainTabs" component={MainTabs}/>
        </Stack.Navigator>
    )
}