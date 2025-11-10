
import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react";
import CustomDrawer from "../components/CustomDrawer";
import SettingsScreen from "../screen/SettingsScreen";
import HomeTabs from "../screen/HomeTabs";
import ProfileScreen from "../screen/ProfileScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {

    const [drawerLocked, setDrawerLocked] = React.useState(true)

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={({ route }) => ({
                drawerType: 'front',
                gestureEnabled: route.name !== 'Settings' || !drawerLocked,})}>

        <Drawer.Screen name="Home" component={HomeTabs} />

        <Drawer.Screen name="Settings">
          {() => <SettingsScreen setDrawerLocked={setDrawerLocked} />}
        </Drawer.Screen>

        <Drawer.Screen name="Profile" component={ProfileScreen} />


</Drawer.Navigator>
    )
}