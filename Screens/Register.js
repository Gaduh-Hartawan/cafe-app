import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigation = useNavigation();

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const registerData = () => {
    axios
      .post("https://cafe-app-pam.cyclic.app/register", {
        nama: nama,
        email: email,
        password: password,
      })
      .then(function (res) {
        // console.log(res.status);
        if (res.status == 201) {
          showToast(res.data.message);
          navigation.navigate("login");
          setNama("");
          setEmail("");
          setPassword("");
        }
      })
      .catch(function (error) {
        console.log(error);
        setMsg("Failed to Register");
      });
  };
  return (
    <SafeAreaView
      style={style.AndroidSafeArea}
      className="flex-1 justify-center items-center"
    >
      <View className="absolute top-[40px] left-[15px] z-[2] bg-white rounded-full p-1">
        <Ionicons
          name="ios-arrow-back"
          size={27}
          color="#2197c8"
          onPress={() => navigation.navigate("login")}
        />
      </View>
      <View className="flex-1 items-center">
        <Text className="mt-[90] text-[40px] text-white font-bold">
          Register
        </Text>
        <View className="z-0 w-screen items-center">
          <View className="mt-[130]">
            <Text className="ml-3 ">Name</Text>
            <TextInput
              textContentType="name"
              style={style.input}
              placeholder="John Doe"
              value={nama}
              onChangeText={setNama}
            />
          </View>
          <View>
            <Text className="ml-3 ">Email</Text>
            <TextInput
              textContentType="emailAddress"
              style={style.input}
              placeholder="user@mail.com"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View>
            <Text className="ml-3 ">Password</Text>
            <TextInput
              textContentType="password"
              secureTextEntry={true}
              style={style.input}
              placeholder="******"
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View className="flex-row justify-center w-[270] mt-7">
            <TouchableOpacity
              className="bg-blue-400 py-3 shadow-md px-6 rounded-xl"
              onPress={registerData}
            >
              <Text className="text-white">Register</Text>
            </TouchableOpacity>
          </View>
          {msg ? (
            <Text className="mt-5 text-[16px] text-white bg-red-600 p-1">
              {msg}
            </Text>
          ) : null}
        </View>
        <View className="absolute z-[-1] top-0 bottom-0 left-0 right-0 ">
          <View className="bg-blue-400 a h-[230] left-0 rounded-bl-[15px] rounded-br-[15px]"></View>
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

export default Register;
