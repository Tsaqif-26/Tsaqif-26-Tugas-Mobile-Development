import { SafeAreaView } from "react-native-safe-area-context";
import Evaluasi from "./src/components/evaluasi";

export default function App() {

  return(
    
    <SafeAreaView style={{flex: 1}} >
      <Evaluasi/>
    </SafeAreaView>

  )
}