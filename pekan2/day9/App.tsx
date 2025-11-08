import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/RootStack";
import { enableScreens } from 'react-native-screens';
enableScreens();

export default function App() {

  return(
      <NavigationContainer>
          <RootStack/>
      </NavigationContainer>
  )
}
