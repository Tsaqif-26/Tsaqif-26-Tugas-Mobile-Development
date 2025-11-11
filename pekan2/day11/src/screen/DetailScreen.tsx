import { Button, Text, View } from "react-native"


export default function DetailScreen({navigation, route}) {

    const {id} = route.params || {}

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Detail Produk {id}</Text>

            <Button title="Reset Ke TopTabs" onPress={() => navigation.reset({index: 0, routes: [{name: 'TopTabs'}]})}/>
            
            <Button title="Kembali Ke Drawer Home" onPress={() => navigation.getParent()?.goBack()}/>

        </View>
    )
}