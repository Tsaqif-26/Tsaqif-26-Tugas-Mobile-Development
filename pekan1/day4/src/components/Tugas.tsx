import { useState } from "react"
import { FlatList, RefreshControl, ScrollView, SectionList, StyleSheet, Text } from "react-native"


const Apps = () => {

  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1000);
  }

  const flatData = Array.from({length: 5}, (_, i) => ({
    id: i.toString(),
    title: `FlatList Item ${i + 1}`
  }))

  const sectionData = [
     { title: 'A', data: ['Apple', 'Avocado'] },
    { title: 'B', data: ['Banana', 'Blueberry'] }
  ]

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Scroll View</Text>
      <ScrollView style={styles.box} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </ScrollView>

      <Text>Flat List</Text>

      <FlatList style={styles.box}
        data={flatData}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <Text>{item.title}</Text>}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }/>

        <Text style={styles.header}>Section List</Text>

        <SectionList style={styles.box}
                     sections={sectionData}
                     keyExtractor={(item, index) => item + index}
                     renderItem={({item}) => <Text>{item}</Text>}
                     renderSectionHeader={({ section }) => (
                          <Text style={styles.section}>{section.title}</Text>)} 
                     refreshControl={
                      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                     } />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f7fa' },
  header: { fontSize: 18, fontWeight: '600', marginVertical: 12, backgroundColor: '#a7a4a4ff' },
  box: { marginBottom: 20, backgroundColor: '#ffffff', padding: 14, borderRadius: 8},
  section: { fontWeight: '700', backgroundColor: '#e0f2fe', padding: 8 ,color:'#0369a1'},
})

export default Apps