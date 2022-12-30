import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";

const HomeScreen = () => {
  const [product, setProduct] = useState([]);
  const getProduct = () => {
    axios
      .get("https://cafe-app-pam.cyclic.app/products")
      .then((res) => setProduct(res.data));
  };

  useEffect(() => {
    getProduct();
  }, [product]);

  return (
    <View>
      <FlatList
        data={product}
        renderItem={({ item }) => <MenuCard data={item} />}
        keyExtractor={(item) => item.id_product}
      />
    </View>
  );
};

export default HomeScreen;
