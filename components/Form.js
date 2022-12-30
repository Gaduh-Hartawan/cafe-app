import { View, Text, TextInput, Button, ToastAndroid } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";

const Form = ({ id }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const navigation = useNavigation();
  const route = useRoute();

  const data = {
    product_name: name,
    price: price,
    description: desc,
    img_url: imgUrl,
  };

  const showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const postData = () => {
    axios
      .post("https://cafe-app-pam.cyclic.app/products", data)
      .then((res) => {
        if (res.status == 201) {
          showToast(res.data.message);
          navigation.navigate("menu");
          setName("");
          setPrice();
          setDesc("");
          setImgUrl("");
        }
      })
      .catch((err) => {
        showToast("Tambah Produk Gagal!");
      });
  };
  let updateData;
  if (id) {
    updateData = () => {
      axios
        .put(`https://cafe-app-pam.cyclic.app/products/${id}`, data)
        .then((res) => {
          if (res.status == 201) {
            showToast(res.data.message);
            navigation.navigate("menu");
            setName("");
            setPrice();
            setDesc("");
            setImgUrl("");
          }
        })
        .catch((err) => {
          showToast("Edit Produk Gagal!");
        });
    };

    const getProductById = () => {
      axios
        .get(`https://cafe-app-pam.cyclic.app/products/${id}`)
        .then((res) => {
          // console.log(res.data[0]);
          setName(res.data[0].product_name);
          setPrice(res.data[0].price);
          setDesc(res.data[0].description);
          setImgUrl(res.data[0].img_url);
        })
        .catch((err) => {
          // console.log(err);
          showToast("Kesalahan Ambil Data");
        });
    };

    useEffect(() => {
      getProductById();
    }, []);
  }

  return (
    <View className="h-screen mt-10 items-center">
      <View className="mb-8">
        <Text className="text-blue-400">Product Name</Text>
        <TextInput
          placeholder="Input Product Name"
          className="border-b-2 border-b-blue-400 mt-2 w-[250]"
          value={name}
          onChangeText={setName}
        />
      </View>
      <View className="mb-8">
        <Text className="text-blue-400">Price</Text>
        <TextInput
          placeholder="Input Product Price"
          className="border-b-2 border-b-blue-400 mt-2 w-[250]"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />
      </View>
      <View className="mb-8">
        <Text className="text-blue-400">Description</Text>
        <TextInput
          placeholder="Input Product Description"
          className="border-b-2 border-b-blue-400 mt-2 w-[250]"
          multiline={true}
          value={desc}
          onChangeText={setDesc}
        />
      </View>
      <View className="mb-8">
        <Text className="text-blue-400">Image URL</Text>
        <TextInput
          placeholder="Input Image URL"
          className="border-b-2 border-b-blue-400 mt-2 w-[250]"
          multiline={true}
          keyboardType="url"
          value={imgUrl}
          onChangeText={setImgUrl}
        />
      </View>
      {route.name == "addproduct" ? (
        <View className="w-[100] mt-3">
          <Button title="Submit" onPress={() => postData()} />
        </View>
      ) : (
        <View className="w-[100] mt-3">
          <Button title="Submit" onPress={() => updateData()} />
        </View>
      )}
    </View>
  );
};

export default Form;
