import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { COLORS } from "../theme";

function Donut({ size = 160, strokeWidth = 16, data }) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segs = [
    { key: "todo", value: data.todo, color: COLORS.primary },
    { key: "completed", value: data.completed, color: COLORS.ink },
    { key: "notdo", value: data.notdo, color: "#C7CBD1" },
    { key: "free", value: data.free, color: "#FFFFFF" },
  ];

  let acc = 0;
  return (
    <Svg width={size} height={size}>
      <G rotation="-90" originX={size / 2} originY={size / 2}>
        <Circle cx={size/2} cy={size/2} r={radius} stroke="#E6E8EF" strokeWidth={strokeWidth} fill="none" />
        {segs.map(s => {
          const portion = s.value / total;
          const dash = circumference * portion;
          const gap = circumference - dash;
          const el = (
            <Circle
              key={s.key}
              cx={size/2} cy={size/2} r={radius}
              stroke={s.color} strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeDashoffset={circumference * (1 - acc / total)}
              strokeLinecap="butt" fill="none"
            />
          );
          acc += s.value;
          return el;
        })}
      </G>
    </Svg>
  );
}

export default function DonutChart({ data }) {
  return (
    <View style={styles.row}>
      <Donut size={160} strokeWidth={16} data={data} />
      <View style={{ marginLeft: 16, justifyContent: "center" }}>
        <LegendItem color={COLORS.primary} label="To do!" />
        <LegendItem color={COLORS.ink} label="Completed!" />
        <LegendItem color="#C7CBD1" label="Not do it!" />
        <LegendItem color="#FFFFFF" label="Free time!" boxStyle={{ borderWidth: 2, borderColor: COLORS.ink }} />
      </View>
    </View>
  );
}

function LegendItem({ color, label, boxStyle }) {
  return (
    <View style={styles.legendRow}>
      <View style={[styles.legendBox, { backgroundColor: color }, boxStyle]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, marginBottom: 8 },
  legendRow: { flexDirection: "row", alignItems: "center", marginVertical: 6 },
  legendBox: { width: 18, height: 18, borderRadius: 4, marginRight: 10 },
  legendText: { fontFamily: "RobotoMono", fontSize: 14, color: COLORS.ink },
});
