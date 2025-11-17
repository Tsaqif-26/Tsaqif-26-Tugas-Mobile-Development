import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from 'react-native-screens';
import DrawerNavigator from "./src/navigation/DrawerNavigator";
import ErrorBoundary from "./src/components/ErrorBoundary";
import GlobalProvider from "./src/components/GlobalContext";

export default function App() {
  enableScreens();
  return (
    <ErrorBoundary>
      <GlobalProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </GlobalProvider>
    </ErrorBoundary>
  );
}
