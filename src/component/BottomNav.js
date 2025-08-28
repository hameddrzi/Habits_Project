import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../theme";
import { useNavigation } from "@react-navigation/native";


function NavIcon({ label, active, isBig, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.item, isBig && { transform: [{ translateY: -2 }] }]}>
      <View style={[
        styles.iconBox,
        active && { backgroundColor: COLORS.ink },
        isBig && { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center" },
      ]}>
        <Text style={[styles.glyph, active && { color: "#fff" }, isBig && { fontSize: 22 }]}>
          {label === "Home" ? "⌂" :
           label === "Calendar" ? "🗓" :
           label === "Activity" ? "🧾" :
           label === "Settings" ? "⚙" : "+"}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function BottomNav() {
  const navigation = useNavigation();
  return (
    <View style={styles.nav}>
      <NavIcon label="Home" onPress={() => navigation.navigate("Home")} />
      <NavIcon label="Calendar" onPress={() => navigation.navigate("ToDo")} />
      <NavIcon label="+" isBig onPress={() => {}} />
      <NavIcon label="Activity" />
      <NavIcon label="Settings" />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    position: "absolute", left: 12, right: 12, bottom: 12,
    backgroundColor: "#fff", borderColor: COLORS.ink, borderWidth: 2,
    borderRadius: 18, paddingVertical: 10, paddingHorizontal: 14,
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 10, elevation: 6,
  },
  item: { flex: 1, alignItems: "center" },
  iconBox: { width: 40, height: 40, borderRadius: 12, borderWidth: 2, borderColor: COLORS.ink, justifyContent: "center", alignItems: "center" },
  glyph: { fontFamily: "RobotoMono", fontSize: 18, color: COLORS.ink },
});
