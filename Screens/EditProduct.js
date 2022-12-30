import { View, Text } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import Form from "../components/Form";

const EditProduct = () => {
  const route = useRoute();
  const { id } = route.params;
  return (
    <View>
      <Form id={id} />
    </View>
  );
};

export default EditProduct;
