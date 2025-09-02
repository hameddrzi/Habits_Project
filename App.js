// App.js
import "react-native-gesture-handler"; // (اختیاری ولی توصیه‌شده برای ناوبری)
import React from "react";
import { SafeAreaView } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimationPicker from "./src/component/screens/AnimationPicker.js";
import HomeScreen from "./src/component/screens/HomeScreen.js";
import ToDoScreen from "./src/component/screens/ToDoScreen.js";
import EditActivityScreen from "./src/component/screens/EditActivityScreen.js"; // ⬅️ این رو جا انداخته بودی
import CreateActivity from "./src/component/screens/CreateActivity.js";
import { TasksProvider } from "./src/state/TasksContext.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    RobotoMono: require("./ui-font/RobotoMono-VariableFont_wght.ttf"),
    RobotoMonoItalic: require("./ui-font/RobotoMono-Italic-VariableFont_wght.ttf"),
  });

  if (!loaded) return null; // می‌تونی اینجا یه Splash ساده هم بذاری

  return (
    <NavigationContainer>
      <TasksProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ToDo" component={ToDoScreen} />
            <Stack.Screen name="EditActivity" component={EditActivityScreen} />
            <Stack.Screen name="CreateActivity" component={CreateActivity} />
            <Stack.Screen name="AnimationPicker" component={AnimationPicker} />
          </Stack.Navigator>
        </SafeAreaView>
      </TasksProvider>
    </NavigationContainer>
  );
}
