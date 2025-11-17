import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import CustomDrawer from "../components/CustomDrawer";
import SettingsScreen from "../screen/SettingsScreen";
import RootTabs from "./RootTabs";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const [drawerLocked, setDrawerLocked] = React.useState(false);

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerType: 'front',
        swipeEnabled: !drawerLocked,
        swipeEdgeWidth: 30,
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={RootTabs}
        initialParams={{ userId: 'U123', lockDrawer: false }}
        listeners={({ navigation }) => ({
          state: () => {
            const route = navigation.getState().routes.find(r => r.name === 'MainTabs');
            const lockDrawer = route?.params?.lockDrawer ?? false;
            setDrawerLocked(lockDrawer);
          },
        })}
      />
      <Drawer.Screen name="Settings">
        {() => <SettingsScreen setDrawerLocked={(locked) => setDrawerLocked(locked)} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}
