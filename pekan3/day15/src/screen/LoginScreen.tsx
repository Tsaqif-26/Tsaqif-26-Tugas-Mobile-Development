import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    const token = "token123"; // simulasi login sukses
    await AsyncStorage.setItem("@app:token", token);
    await AsyncStorage.multiSet([
      ["@app:theme", "light"],
      ["@app:notif", "enabled"],
    ]);
    navigation.replace("Home");
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>Login</Text>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Masuk" onPress={onLogin} />
    </View>
  );
}
