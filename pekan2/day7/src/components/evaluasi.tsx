import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

export default function Evaluasi() {

    const[flexDirection, setFlexDirection] = useState<'row' | 'column' | 'row-reverse' | 'column-reverse'>('row')
    const[justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'space-between'>('flex-start')
    const[alignItems, setAlignItems] = useState<'flex-start' | 'center' | 'stretch'>('flex-start')

    return(
        <View style={styles.container}>
            <View style={[styles.box, {flexDirection, justifyContent, alignItems}]}>
              <View style={styles.blue}/>
              <View style={styles.red}/>
              <View style={styles.green}/>
            </View>

            <Text>Flex Direction</Text>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setFlexDirection('row')}><Text>row</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setFlexDirection('column')}><Text>column</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setFlexDirection('row-reverse')}><Text>row-reverse</Text></TouchableOpacity>
            </View>

            <Text>Justify Content</Text>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setJustifyContent('flex-start')}><Text>flex-start</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setJustifyContent('center')}><Text>center</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setJustifyContent('space-between')}><Text>space-between</Text></TouchableOpacity>
            </View>

            <Text>Align Items</Text>
            <View style={styles.row}>
                <TouchableOpacity onPress={() => setAlignItems('flex-start')}><Text>flex-start</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setAlignItems('center')}><Text>center</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => setAlignItems('stretch')}><Text>stretch</Text></TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 16},
    box: {flex: 1, backgroundColor: '#a49191ff', borderRadius:10},
    blue: {height: 100, width: 100, backgroundColor: 'blue'},
    red: {height: 100, width: 100, backgroundColor: 'red'},
    green: {height: 100, width: 100, backgroundColor: 'green'},
    row: {flexDirection: 'row', justifyContent:'space-around', marginVertical:8, backgroundColor:'gray', borderRadius:20}
})