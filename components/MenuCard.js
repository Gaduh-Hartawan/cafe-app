import { View, Text, Image, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const MenuCard = ({ data }) => {
  const navigation = useNavigation();
  const idProduk = data.id_produk;
  return (
    <View className="flex-row pt-3 bg-white rounded-sm w-screen h-[100] my-2 justify-start">
      <Image
        className="w-[80] h-[80] rounded-lg ml-3"
        resizeMode="cover"
        source={{ uri: data.img_url }}
      />
      <View className="ml-5 mt-1">
        <View className="flex-row justify-between w-[230] mb-3">
          <Text className="font-bold text-[17px]">{data.product_name}</Text>
          <Text>Rp. {data.price}</Text>
        </View>
        <Button
          title="details"
          onPress={() =>
            navigation.navigate("detail", {
              id: data.id_product,
            })
          }
        />
      </View>
    </View>
  );
};

export default MenuCard;
