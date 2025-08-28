// src/component/screens/HomeScreen.js
import React, { useMemo } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";
import Header from "../Header.js";
import DonutChart from "../DonutChart.js";
import HabitCard from "../HabitCard.js";
import BottomNav from "../BottomNav.js";
import { COLORS, SPACING } from "../../theme.js";
import { useTasks } from "../../state/TasksContext.js";

const habits = [
  {
    id: "h1",
    title: "To do!",
    text:
      "At 3:00 PM I must go on confronse at University!\n" +
      "and after that go to the bank",
  },
  { id: "h2", title: "Your last activity1", text: "1i must work about this..." },
  { id: "h3", title: "Your last activity2", text: "2i must work about this..." },
];

export default function HomeScreen() {
  const { tasks } = useTasks(); // فقط داخل کامپوننت

  // محاسبه‌ی داده‌های دونات با useMemo (اختیاری، ولی تمیزتر)
  const chartData = useMemo(() => {
    const completed = tasks.filter(t => t.status === "done").length;
    const notdo     = tasks.filter(t => t.status === "skipped").length;
    const todo      = tasks.length - completed - notdo;
    const free      = 0; // اگر مفهوم Free داری، اینجا حسابش کن
    return { todo, completed, notdo, free };
  }, [tasks]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <Text style={styles.section}>Your progress for this week!</Text>
        <DonutChart data={chartData} />
        <Text style={[styles.section, { marginTop: 8 }]}>Today’s Habits</Text>
        {habits.map(h => (
          <HabitCard key={h.id} title={h.title} text={h.text} />
        ))}
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    fontFamily: "RobotoMono",
    fontSize: 18,
    color: COLORS.ink,
    paddingHorizontal: SPACING.h,
    marginTop: 8,
    marginBottom: 6,
  },
});
