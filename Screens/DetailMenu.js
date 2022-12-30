import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Button,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const DetailMenu = () => {
  const [product, setProduct] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const getProductById = () => {
    axios
      .get(`https://cafe-app-pam.cyclic.app/products/${id}`)
      .then((res) => {
        // console.log(res.data);
        setProduct(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductById();
  }, []);

  const deleteProduct = () => {
    axios
      .delete(`https://cafe-app-pam.cyclic.app/products/${id}`)
      .then((res) => {
        showToast(res.data.message);
        navigation.navigate("home");
      });
  };
  return (
    <SafeAreaView style={style.AndroidSafeArea} className="bg-slate-100">
      <View className="absolute top-[40px] left-[15px] z-[2] bg-white rounded-full p-1">
        <Ionicons
          name="ios-arrow-back"
          size={27}
          color="black"
          onPress={() => navigation.navigate("home")}
        />
      </View>
      <View className="h-[280]">
        <Image className="w-screen h-[280]" source={{ uri: product.img_url }} />
      </View>
      <View className="flex-row w-screen px-6 py-5 justify-between bg-white shadow-lg">
        <Text className="font-bold text-[20px]">{product.product_name}</Text>
        <Text>Rp. {product.price}</Text>
      </View>
      <View className="w-screen px-6 py-4">
        <Text className="font-semibold text-[20px]">Description</Text>
        <Text className="mt-5 ml-[-2] text-justify">{product.description}</Text>
      </View>
      <View className="w-screen justify-end items-center mt-10">
        <View className="flex-row justify-center w-[200]">
          <View className="w-[200]">
            <Button
              title="Edit"
              onPress={() =>
                navigation.navigate("editproduct", {
                  id: id,
                })
              }
            />
          </View>
          <View className="w-[200]">
            <Button
              title="Delete"
              color={"red"}
              onPress={() => deleteProduct()}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  AndroidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});

export default DetailMenu;
