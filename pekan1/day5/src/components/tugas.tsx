import React from 'react';
import { View, Text, Button, Pressable, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, TouchableNativeFeedback, Platform, StyleSheet, Alert, } from 'react-native';

const DailyEvaluation = () => {
  const handlePress = (msg: string) => Alert.alert(msg);

  return (
    <View style={styles.container}>
      <Button
        title="Button Sederhana"
        onPress={() => handlePress('Button Pressed!')}
        color="#007AFF"
        disabled={false}
        accessibilityLabel="Tombol Sederhana"
      />

 
      <Pressable
        onPress={() => handlePress('Pressable Pressed!')}
        onLongPress={() => handlePress('Pressable Long Press!')}
        onPressIn={() => console.log('Press In')}
        onPressOut={() => console.log('Press Out')}
        style={({ pressed }) => [
          styles.pressable,
          { opacity: pressed ? 0.6 : 1 },
        ]}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        android_ripple={{ color: '#2196F3', borderless: false }}
        disabled={false}
      >
        <Text style={styles.text}>Pressable</Text>
      </Pressable>

      <TouchableOpacity
        style={styles.opacityBtn}
        activeOpacity={0.5}
        onPress={() => handlePress('TouchableOpacity Pressed!')}
        disabled={false}
      >
        <Text style={styles.text}>TouchableOpacity</Text>
      </TouchableOpacity>


      <TouchableHighlight
        style={styles.highlightBtn}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        onPress={() => handlePress('TouchableHighlight Pressed!')}
        onShowUnderlay={() => console.log('Show Underlay')}
        onHideUnderlay={() => console.log('Hide Underlay')}
      >
        <Text style={styles.text}>TouchableHighlight</Text>
      </TouchableHighlight>

  
      <TouchableWithoutFeedback
        onPress={() => handlePress('TouchableWithoutFeedback Pressed!')}
        onLongPress={() => handlePress('Long Press Without Feedback!')}
        hitSlop={{ top: 20, bottom: 20 }}
        disabled={false}
      >
        <View style={styles.noFeedback}>
          <Text style={styles.text}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>

 
      {Platform.OS === 'android' && (
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple('#2196F3', true)}
          useForeground={TouchableNativeFeedback.canUseNativeForeground?.()}
          onPress={() => handlePress('Native Ripple Pressed!')}
        >
          <View style={styles.nativeBtn}>
            <Text style={styles.textBlack}>TouchableNativeFeedback</Text>
          </View>
        </TouchableNativeFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 15,
  },
  pressable: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  opacityBtn: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  highlightBtn: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  noFeedback: {
    backgroundColor: 'gray',
    padding: 15,
    borderRadius: 5,
  },
  nativeBtn: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  textBlack: {
    color: 'black',
    fontSize: 16,
  },
});

export default DailyEvaluation;
