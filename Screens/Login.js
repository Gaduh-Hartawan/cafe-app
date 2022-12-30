import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigation = useNavigation();

  const loginData = () => {
    axios
      .post("https://cafe-app-pam.cyclic.app/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        // console.log(res.status);
        if (res.status == 200) {
          navigation.navigate("home");
        }
      })
      .catch(function (error) {
        // console.log(error);
        setMsg("Invalid Credentials");
      });
  };
  return (
    <SafeAreaView
      style={style.AndroidSafeArea}
      className="flex-1 justify-center items-center"
    >
      <View className="flex-1 items-center">
        <Text className="mt-[100] text-[50px] text-white font-bold">Login</Text>
        <View className="z-0 w-screen items-center">
          <View className="mt-[130]">
            <Text className="ml-3 text-blue-400">Email</Text>
            <TextInput
              textContentType="emailAddress"
              style={style.input}
              placeholder="user@mail.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text className="ml-3 text-blue-400">Password</Text>
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              style={style.input}
              placeholder="******"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View className="flex-row justify-between w-[170] mt-2">
            <Button title="Sign In" onPress={loginData} />
            <Button
              title="Register"
              onPress={() => navigation.navigate("register")}
            />
          </View>
          {msg ? (
            <Text className="mt-5 text-[16px] text-white bg-red-600 p-1">
              {msg}
            </Text>
          ) : null}
        </View>
        <View className="absolute z-[-1] top-0 bottom-0 left-0 right-0 ">
          <View className="bg-blue-400 a h-[250] left-0 rounded-bl-[15px] rounded-br-[15px]"></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  input: {
    height: 40,
    margin: 12,
    width: 200,
    borderWidth: 1,
    padding: 10,
  },
});

export default Login;
