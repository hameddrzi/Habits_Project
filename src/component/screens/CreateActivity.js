import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SPACING } from "../../theme";
import { useTasks } from "../../state/TasksContext";
import LottieView from "lottie-react-native";
import { ANIMATIONS } from "../../assets/animations";

export default function CreateActivity() {
  const navigation = useNavigation();
  const { animId, note, setNote, tasks, addTask, renameTask, deleteTask } = useTasks();

  // We keep only time values locally, keyed by task id, since global tasks have no time field yet.
  const [timeById, setTimeById] = useState({});
  const setTime = (id, value) => setTimeById(prev => ({ ...prev, [id]: value }));
  const onAddTask = () => addTask("");
  const onRemoveTask = (id) => deleteTask(id);

  const selectedAnim = ANIMATIONS.find(a => a.id === animId);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.glyph}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create an activity</Text>
        <Text style={styles.menu}>≡</Text>
      </View>
      <View style={styles.hr} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Text */}
        <Text style={styles.sectionLabel}>Text</Text>
        <View style={styles.box}>
          <TextInput
            placeholder="you can write an text here...!"
            style={styles.noteInput}
            multiline
            textAlignVertical="top"
            value={note}
            onChangeText={setNote}
          />
        </View>
        <View style={styles.sectionDivider} />

        {/* Tasks */}
        <Text style={styles.sectionLabel}>Write your Tasks</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.row}>
            <TextInput
              placeholder="Write a task here..."
              style={[styles.taskInput, { flex: 1 }]}
              value={task.title}
              onChangeText={(t) => renameTask(task.id, t)}
            />
            <TextInput
              placeholder="8:00 AM"
              style={styles.timeInput}
              value={timeById[task.id] ?? "8:00 AM"}
              onChangeText={(t) => setTime(task.id, t)}
            />
            <TouchableOpacity onPress={() => onRemoveTask(task.id)}>
              <Text style={[styles.smallBtn, { color: "#D00" }]}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
        <TouchableOpacity style={styles.addRow} onPress={onAddTask}>
          <Text style={{ fontFamily: "RobotoMono", color: COLORS.ink }}>＋ Add</Text>
        </TouchableOpacity>

        <View style={styles.sectionDivider} />

        {/* Photo / Gif */}
        <Text style={styles.sectionLabel}>Select a Photo or Gif</Text>
        <View style={[styles.box, { height: 220, justifyContent: "center", alignItems: "center", overflow: "hidden" }]}>
          {selectedAnim ? (
            <LottieView autoPlay loop style={{ width: "100%", height: "100%" }} source={selectedAnim.src} />
          ) : (
            <Text style={{ fontFamily: "RobotoMono", color: COLORS.sub }}>LottieFile</Text>
          )}
        </View>
        <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 16, marginTop: 8 }}>
          <TouchableOpacity style={styles.ghostBtn}>
            <Text style={styles.ghostText}>From Device!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate("AnimationPicker")}>
            <Text style={styles.ghostText}>Gif</Text>
          </TouchableOpacity>
        </View>

        {/* Save */}
        <View style={{ alignItems: "flex-end", paddingHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.primaryText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16, paddingTop: 10, paddingBottom: 8,
    flexDirection: "row", alignItems: "center", justifyContent: "space-between",
  },
  glyph: { fontFamily: "RobotoMono", fontSize: 24, color: COLORS.ink },
  title: { fontFamily: "RobotoMono", fontSize: 22, color: COLORS.ink },
  menu: { fontFamily: "RobotoMono", fontSize: 22, color: COLORS.ink },
  hr: { height: 1, backgroundColor: "#E5E7EB" },

  sectionLabel: {
    fontFamily: "RobotoMono", fontSize: 16, color: COLORS.ink,
    marginTop: 12, marginBottom: 8, paddingHorizontal: 16,
  },
  box: {
    marginHorizontal: 16, borderWidth: 2, borderRadius: 10,
    borderColor: COLORS.primary, backgroundColor: "#fff", padding: 10,
  },
  noteInput: {
    minHeight: 110, fontFamily: "RobotoMono", fontSize: 14,
    color: COLORS.ink, lineHeight: 20,
  },
  sectionDivider: {
    height: 6, backgroundColor: "transparent",
    borderBottomWidth: 3, borderBottomColor: COLORS.ink,
    marginHorizontal: 16, marginTop: 12,
  },
  row: {
    flexDirection: "row", alignItems: "center",
    gap: 8, paddingHorizontal: 16, marginBottom: 10,
  },
  taskInput: {
    borderWidth: 2, borderColor: COLORS.primary, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8,
    fontFamily: "RobotoMono", fontSize: 14, color: COLORS.ink, backgroundColor: "#fff",
  },
  timeInput: {
    width: 90, borderWidth: 2, borderColor: COLORS.primary, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 8,
    fontFamily: "RobotoMono", fontSize: 12, color: COLORS.ink, backgroundColor: "#fff",
    textAlign: "center",
  },
  smallBtn: { fontSize: 18, marginHorizontal: 4 },
  addRow: { marginTop: 2, marginBottom: 10, marginLeft: 16 },
  ghostBtn: { borderWidth: 2, borderColor: COLORS.ink, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 6 },
  ghostText: { fontFamily: "RobotoMono", color: COLORS.ink },
  primaryBtn: { borderWidth: 2, borderColor: COLORS.ink, borderRadius: 10, paddingHorizontal: 16, paddingVertical: 10 },
  primaryText: { fontFamily: "RobotoMono", color: COLORS.ink, fontSize: 16 },
});


