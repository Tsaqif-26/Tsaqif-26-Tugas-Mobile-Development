import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import RootStack from "./src/navigation/RootStack";
import 'react-native-gesture-handler';

export default function App() {
  
  enableScreens();
  
  return(
      <NavigationContainer>
          <RootStack/>
      </NavigationContainer>
  )
}
