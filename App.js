import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  Login,
  HomeScreen,
  AddProduct,
  Register,
  DetailMenu,
  EditProduct,
} from "./Screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

const HomeTabs = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "menu") {
            iconName = "home";
            size = 24;
            color = "gray";
          } else if (route.name === "addproduct") {
            iconName = "pluscircleo";
            size = 24;
            color = "gray";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#19acba",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="menu"
        component={HomeScreen}
        options={{ title: "Menu", headerTitleAlign: "center" }}
      />
      <Tab.Screen
        name="addproduct"
        component={AddProduct}
        options={{ title: "Add Product", headerTitleAlign: "center" }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="home"
          component={HomeTabs}
          options={{
            headerBackVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="detail"
          component={DetailMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="editproduct"
          component={EditProduct}
          options={{ title: "Edit Product", headerTitleAlign: "center" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
