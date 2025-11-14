import { DrawerContentScrollView } from "@react-navigation/drawer"
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CustomDrawer(props) {

    const user = {name: 'kyo', avatar: 'https://avatar.iran.liara.run/public/2' }

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.header}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <Text style={styles.name}>{user.name}</Text>
            </View>

            <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate("MainTabs")}>
                <Ionicons name='home-outline' size={20}/>
                <Text style={styles.label}>Home</Text>
            </TouchableOpacity>

            <View style={styles.divider}/>
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                props.navigation.reset({
                index: 0,
                routes: [{ name: 'MainTabs' }],});}}>

            <Ionicons name='log-out-outline' size={20} color={'red'} />
            <Text style={[styles.label, { color: 'red' }]}>Logout</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  item: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  label: { marginLeft: 16, fontSize: 16 },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 10 },
});