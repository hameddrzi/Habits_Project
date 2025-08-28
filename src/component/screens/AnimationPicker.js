import React from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";
import { useTasks } from "../../state/TasksContext";
import { ANIMATIONS } from "../../assets/animations";
import { COLORS } from "../../theme";

export default function AnimationPicker() {
  const navigation = useNavigation();
  const { animId, setAnimation } = useTasks();

  const onSelect = (id) => {
    setAnimation(id);         // سراسری ذخیره می‌شه + AsyncStorage
    navigation.goBack();
  };

  const renderItem = ({ item }) => {
    const active = item.id === animId;
    return (
      <TouchableOpacity style={[styles.card, active && styles.active]} onPress={() => onSelect(item.id)}>
        <LottieView autoPlay loop style={{ width: "100%", height: 110 }} source={item.src} />
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 12 }}>
      <Text style={styles.title}>Choose an animation</Text>
      <FlatList
        data={ANIMATIONS}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ paddingBottom: 20, gap: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, marginVertical: 8, fontFamily: "RobotoMono", color: COLORS.ink },
  card: {
    flex: 1,
    borderWidth: 2,
    borderColor: COLORS.ink,
    borderRadius: 14,
    padding: 10,
    backgroundColor: "#fff",
  },
  active: { borderColor: COLORS.primary, shadowColor: COLORS.primary, shadowOpacity: 0.25, elevation: 2 },
  name: { marginTop: 6, fontFamily: "RobotoMono", color: COLORS.ink, fontSize: 14, textAlign: "center" },
});
