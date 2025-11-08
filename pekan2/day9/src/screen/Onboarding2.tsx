import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";

type RootStackParamList = {
    Onboarding1: undefined
    Onboarding2: undefined
    MainTabs: undefined
}

type Props = {
    navigation: NativeStackNavigationProp<RootStackParamList, 'Onboarding2'>
}
export default function Onboarding2({navigation}: Props) {

    return(
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Lihat Katalog</Text>
            <Button title="Mulai" onPress={() => navigation.replace('MainTabs')}/>
        </View>
    )
}