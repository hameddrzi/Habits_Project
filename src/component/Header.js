import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS, SPACING } from "../theme";

export default function Header() {
  return (
    <>
      <View style={styles.header}>
        <Image source={require("../../assets/profile.jpg")} style={styles.avatar} />
        <Text style={styles.title}>Home</Text>
        <Image source={require("../../assets/HamburgerMenu.png")} style={styles.menu} />
      </View>
      <View style={styles.hr} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: SPACING.h,
    paddingTop: 6,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.bg,
  },
  avatar: {
    width: 42, height: 42, borderRadius: 21,
    borderWidth: 2, borderColor: COLORS.primary,
  },
  title: { fontFamily: "RobotoMono", fontSize: 20, color: COLORS.ink },
  menu: { width: 26, height: 18, resizeMode: "contain" },
  hr: { height: 1, backgroundColor: COLORS.divider, marginBottom: 8 },
});
