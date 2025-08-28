// src/component/screens/ToDoScreen.js
import React, { useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Svg, { Line, Path, Rect } from "react-native-svg";

import { COLORS, SPACING } from "../../theme.js";
import BottomNav from "../BottomNav";
import { useTasks } from "../../state/TasksContext.js";   // کانتکست
import { ANIMATIONS } from "../../assets/animations";     // لیست لوتی‌ها

export default function ToDoScreen() {
  const navigation = useNavigation();
  const lottieRef = useRef(null);

  // از کانتکست
  const { tasks, toggleDone, addTask, setStatus, note, animId } = useTasks();

  // انیمیشن انتخاب‌شده (سراسری)
  const selectedAnim = ANIMATIONS.find(a => a.id === animId) ?? ANIMATIONS[0];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backGlyph}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>To do!</Text>
          <Image
            source={require("../../../assets/HamburgerMenu.png")}
            style={styles.menu}
          />
        </View>
        <View style={styles.hr} />

        {/* Section title */}
        <Text style={styles.sectionTitle}>Today!</Text>

        {/* Highlight card */}
        <View style={styles.highlightCard}>
          <View style={styles.lottieBox}>
            <LottieView
              ref={lottieRef}
              autoPlay
              loop
              style={{ width: "100%", height: "100%", borderRadius: 12 }}
              source={selectedAnim.src}  // ⬅️ از animId
            />
          </View>

          <View style={styles.highlightRight}>
            <Text style={styles.highlightText}>{note}</Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("EditActivity")}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              style={{ alignSelf: "flex-end" }}
              accessibilityRole="button"
              accessibilityLabel="Edit activity"
            >
              <Image
                source={require("../../../assets/ArrowRight.png")}
                style={{ width: 26, height: 20 }}
              />
            </TouchableOpacity>
          </View>

          {/* سایه صورتی لبه راست/پایین */}
          <View style={styles.pinkShadow} />
        </View>

        {/* Task list */}
        <View style={{ marginTop: 6 }}>
          {tasks.map((t, idx) => (
            <TaskRow
              key={t.id}
              title={t.title}
              status={t.status}
              onToggle={() => toggleDone(t.id)}         // tap = done/todo
              onSkip={() => setStatus(t.id, "skipped")} // long-press = skipped
              isLast={idx === tasks.length - 1}
            />
          ))}

          {/* Add Task button => صفحه ویرایش */}
          <View style={{ alignItems: "flex-end", paddingHorizontal: 16, marginTop: 8 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditActivity")}
              activeOpacity={0.8}
              style={styles.addBtn}
              accessibilityRole="button"
              accessibilityLabel="Add task"
            >
              <Text style={styles.addBtnText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.sectionDivider} />

        {/* Progress section */}
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>
          Your progress:
        </Text>
        <ProgressCard tasks={tasks} />
      </ScrollView>

      {/* Bottom navigation */}
      <BottomNav />
    </View>
  );
}

/* ----- Task Row Component ----- */
function TaskRow({ title, status, onToggle, onSkip, isLast }) {
  const done = status === "done";
  const skipped = status === "skipped";

  return (
    <View style={{ paddingHorizontal: 16 }}>
      <View style={styles.taskRow}>
        <Text style={styles.bellGlyph}>🔔</Text>

        {/* Tap = toggleDone / Long-press = skipped */}
        <TouchableOpacity
          onPress={onToggle}
          onLongPress={onSkip}
          delayLongPress={300}
          style={[styles.circle, done && { borderColor: COLORS.primary }]}
        >
          {done ? <View style={styles.circleInner} /> : null}
        </TouchableOpacity>

        <Text
          style={[
            styles.taskText,
            done && { textDecorationLine: "line-through", color: "#9CA3AF" },
            skipped && { opacity: 0.55, fontStyle: "italic" },
          ]}
        >
          {title}
        </Text>
      </View>

      {!isLast && <View style={styles.rowDivider} />}
    </View>
  );
}

/* ----- Smooth Cumulative Progress Chart (uses status) ----- */
function ProgressCard({ tasks = [] }) {
  const w = 320, h = 180;
  const pad = 10;
  const total = Math.max(tasks.length, 1);
  const gridCols = Math.max(tasks.length, 6);
  const gridRows = 4;

  // تجمعی
  let cumDone = 0, cumNot = 0;
  const pinkVals = tasks.map((t) => {
    if (t.status === "done") cumDone += 1;
    return cumDone / total;
  });
  const blueVals = tasks.map((t) => {
    if (t.status !== "done") cumNot += 1; // todo + skipped
    return cumNot / total;
  });

  const pv = pinkVals.length ? pinkVals : [0, 0, 0, 0, 0, 0];
  const bv = blueVals.length ? blueVals : [0, 0, 0, 0, 0, 0];

  const xAt = (i, n) => pad + (i * (w - pad * 2)) / Math.max(n - 1, 1);
  const yAt = (v) => pad + (1 - v) * (h - pad * 2);

  const toPoints = (vals) =>
    vals.map((v, i, arr) => ({ x: xAt(i, arr.length), y: yAt(v) }));

  const buildSmoothPath = (pts) => {
    if (!pts.length) return "";
    let d = `M${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const cx = (prev.x + curr.x) / 2;
      d += ` Q ${cx} ${prev.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const pinkPath = buildSmoothPath(toPoints(pv));
  const bluePath = buildSmoothPath(toPoints(bv));

  return (
    <View style={{ alignItems: "center" }}>
      <Svg width={w} height={h}>
        <Rect
          x={2} y={2} width={w - 4} height={h - 4}
          rx={8} ry={8}
          stroke={COLORS.ink} strokeWidth={3} fill="#fff"
        />
        {Array.from({ length: gridCols - 1 }).map((_, i) => {
          const x = pad + ((i + 1) * (w - pad * 2)) / gridCols;
          return (
            <Line
              key={`v${i}`} x1={x} y1={pad} x2={x} y2={h - pad}
              stroke={COLORS.ink} strokeWidth={1} opacity={0.35}
            />
          );
        })}
        {Array.from({ length: gridRows - 1 }).map((_, i) => {
          const y = pad + ((i + 1) * (h - pad * 2)) / gridRows;
          return (
            <Line
              key={`h${i}`} x1={pad} y1={y} x2={w - pad} y2={y}
              stroke={COLORS.ink} strokeWidth={1} opacity={0.35}
            />
          );
        })}

        <Path d={bluePath} stroke={COLORS.ink} strokeWidth={4} fill="none" />
        <Path d={pinkPath} stroke={COLORS.primary} strokeWidth={4} fill="none" />
      </Svg>
    </View>
  );
}

/* ----- Styles ----- */
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backGlyph: { fontFamily: "RobotoMono", fontSize: 28, color: COLORS.ink },
  title: { fontFamily: "RobotoMono", fontSize: 28, color: COLORS.ink },
  menu: { width: 28, height: 20, resizeMode: "contain" },

  hr: { height: 1, backgroundColor: "#E5E7EB", marginBottom: 8 },

  sectionTitle: {
    fontFamily: "RobotoMono",
    fontSize: 20,
    color: COLORS.ink,
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 8,
  },

  highlightCard: {
    marginHorizontal: 16,
    marginTop: 6,
    padding: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: COLORS.ink,
    borderRadius: SPACING.cardRadius,
    flexDirection: "row",
    position: "relative",
  },
  lottieBox: {
    width: 110,
    height: 150,
    backgroundColor: COLORS.night,
    borderRadius: 12,
  },
  highlightRight: { flex: 1, paddingLeft: 12, paddingRight: 6, paddingTop: 6 },
  highlightText: {
    fontFamily: "RobotoMono",
    fontSize: 16,
    color: COLORS.ink,
    lineHeight: 22,
    marginRight: 4,
  },
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

  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 12,
  },
  bellGlyph: { fontSize: 22 },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  circleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
  },
  taskText: {
    flex: 1,
    fontFamily: "RobotoMono",
    fontSize: 16,
    color: COLORS.ink,
  },
  rowDivider: {
    height: 2,
    backgroundColor: COLORS.primary,
    opacity: 0.7,
    marginTop: 6,
    marginBottom: 6,
  },

  addBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: COLORS.ink,
    borderRadius: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.35,
    shadowRadius: 0,
    elevation: 0,
  },
  addBtnText: {
    fontFamily: "RobotoMono",
    fontSize: 16,
    color: COLORS.ink,
  },

  sectionDivider: {
    height: 6,
    backgroundColor: "transparent",
    borderBottomWidth: 4,
    borderBottomColor: COLORS.ink,
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    marginTop: 12,
    marginHorizontal: 16,
  },
});
