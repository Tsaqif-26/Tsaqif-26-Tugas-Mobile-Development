import { View, Button } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';

type Props = {
  setDrawerLocked: (locked: boolean) => void;
};

type DrawerParamList = {
  Home: undefined;
  Settings: undefined;
};

export default function SettingsScreen({ setDrawerLocked }: Props) {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  return (
    <View style={{ padding: 20 }}>
      <Button title="Buka Swipe Drawer" onPress={() => setDrawerLocked(false)} />
      <Button
        title="Kembali ke Home"
        onPress={() => {
          navigation.navigate("Home");
          navigation.dispatch(DrawerActions.closeDrawer());
        }}
      />
    </View>
  );
}
