// src/component/HabitCard.js
import React, { useRef } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

import { COLORS, SPACING } from "../theme";
import { useTasks } from "../state/TasksContext";         // ⬅️ animId از کانتکست
import { ANIMATIONS } from "../assets/animations";        // ⬅️ لیست ثابت لوتی‌ها

export default function HabitCard({ title, text }) {
  const lottieRef = useRef(null);
  const navigation = useNavigation();
  const { animId } = useTasks();

  // انیمیشن انتخاب‌شده به‌صورت سراسری
  const selectedAnim = ANIMATIONS.find(a => a.id === animId) ?? ANIMATIONS[0];

  return (
    <View style={styles.card}>
      <View style={styles.lottieWrap}>
        <LottieView
          ref={lottieRef}
          autoPlay
          loop
          style={{ width: "100%", height: "100%", borderRadius: 12 }}
          source={selectedAnim.src}
        />
      </View>

      <View style={{ paddingHorizontal: 16, paddingTop: 10, paddingBottom: 14 }}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardText}>{text}</Text>

        <View style={styles.arrowRow}>
          <View />
          <TouchableOpacity
            onPress={() => navigation.navigate("ToDo")}
            accessibilityRole="button"
            accessibilityLabel="Open To do"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Image
              source={require("../../assets/ArrowRight.png")}
              style={styles.arrow}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* سایه صورتی باریک پایین راست (طبق طرح) */}
      <View style={styles.pinkShadow} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: SPACING.h,
    marginTop: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.ink,
    borderRadius: SPACING.cardRadius,
    overflow: "hidden",
    position: "relative",
  },
  lottieWrap: {
    backgroundColor: COLORS.night,
    height: 170,
    borderBottomLeftRadius: SPACING.cardRadius,
    borderBottomRightRadius: SPACING.cardRadius,
  },
  cardTitle: {
    fontFamily: "RobotoMono",
    fontSize: 22,
    color: COLORS.ink,
    marginBottom: 6,
  },
  cardText: {
    fontFamily: "RobotoMono",
    fontSize: 14,
    color: COLORS.sub,
    lineHeight: 20,
  },
  arrowRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: { width: 26, height: 20, alignSelf: "flex-end" },
  pinkShadow: {
    position: "absolute",
    right: -2,
    bottom: -2,
    width: "100%",
    height: "100%",
    borderRadius: SPACING.cardRadius,
    borderWidth: 2,
    borderColor: COLORS.primary,
    zIndex: -1,
  },
});
