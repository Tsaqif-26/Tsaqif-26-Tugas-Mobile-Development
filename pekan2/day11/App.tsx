import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import 'react-native-gesture-handler';
import DrawerNavigator from "./src/navigation/DrawerNavigator";

export default function App() {
  
  enableScreens();
  
  return(
      <NavigationContainer>
          <DrawerNavigator/>
      </NavigationContainer>
  )
}
