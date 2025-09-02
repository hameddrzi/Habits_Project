import React, { useState } from "react";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SPACING } from "../../theme";
import { useTasks } from "../../state/TasksContext";
import LottieView from "lottie-react-native";
import { ANIMATIONS } from "../../assets/animations";

export default function EditActivityScreen() {
  const navigation = useNavigation();
  const { tasks, addTask, renameTask, deleteTask, setStatus, note, setNote, animId } = useTasks();

  const [localNote, setLocalNote] = useState(note);
  const [drafts, setDrafts] = useState(
    tasks.map(t => ({ id: t.id, title: t.title }))
  );

  const commit = () => {
    // ذخیره متن
    setNote(localNote.trim());
    // اعمال تغییرات عنوان‌ها
    drafts.forEach(d => renameTask(d.id, d.title));
    navigation.goBack();
  };

  const onAddRow = () => {
    const id = `tmp-${Date.now()}`;
    setDrafts(prev => [...prev, { id, title: "" }]);
    // همزمان یک تسک واقعی هم بساز
    addTask("");
  };

  const onChangeTitle = (id, title) =>
    setDrafts(prev => prev.map(d => (d.id === id ? { ...d, title } : d)));

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.glyph}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit activity</Text>
        <Text style={styles.menu}>≡</Text>
      </View>
      <View style={styles.hr} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Change Text (highlight) */}
        <Text style={styles.sectionLabel}>Change  Text</Text>
        <View style={styles.box}>
          <TextInput
            value={localNote}
            onChangeText={setLocalNote}
            multiline
            textAlignVertical="top"
            placeholder="Type your plan..."
            style={styles.noteInput}
          />
        </View>
        <View style={styles.sectionDivider} />

        {/* Add Task: list of editable rows */}
        <Text style={styles.sectionLabel}>Add Task:</Text>
        {drafts.map((d, idx) => (
          <View key={d.id} style={styles.row}>
            <TextInput
              value={d.title}
              onChangeText={(t) => onChangeTitle(d.id, t)}
              placeholder={`Task ${idx + 1}`}
              style={styles.taskInput}
            />
            <TouchableOpacity onPress={() => setStatus(tasks[idx]?.id, "done")}>
              <Text style={styles.smallBtn}>✔</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setStatus(tasks[idx]?.id, "skipped")}>
              <Text style={styles.smallBtn}>⏭</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                deleteTask(tasks[idx]?.id);
                setDrafts(prev => prev.filter(x => x.id !== d.id));
              }}
            >
              <Text style={[styles.smallBtn, { color: "#D00" }]}>🗑</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Add new row */}
        <TouchableOpacity style={styles.addRow} onPress={onAddRow}>
          <Text style={{ fontFamily: "RobotoMono", color: COLORS.ink }}>＋ Add</Text>
        </TouchableOpacity>

        <View style={styles.sectionDivider} />

        {/* Change Photo (show selected animation) */}
        <Text style={styles.sectionLabel}>Change Photo:</Text>
        <View style={[styles.box, { height: 180, justifyContent: "center", alignItems: "center", overflow: "hidden" }]}>
          {(() => {
            const selected = ANIMATIONS.find(a => a.id === animId);
            if (!selected) {
              return <Text style={{ fontFamily: "RobotoMono", color: COLORS.sub }}>LottieFile</Text>;
            }
            return (
              <LottieView
                autoPlay
                loop
                style={{ width: "100%", height: "100%" }}
                source={selected.src}
              />
            );
          })()}
        </View>
        <View style={{ flexDirection: "row", gap: 12, paddingHorizontal: 16, marginTop: 8 }}>
          <TouchableOpacity style={styles.ghostBtn}>
            <Text style={styles.ghostText}>From Device</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.ghostBtn} onPress={() => navigation.navigate("AnimationPicker")}>
            <Text style={styles.ghostText}>Gif</Text>
          </TouchableOpacity>
        </View>

        {/* Save button */}
        <View style={{ alignItems: "flex-end", paddingHorizontal: 16, marginTop: 16 }}>
          <TouchableOpacity onPress={commit} style={styles.primaryBtn}>
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
    minHeight: 100, fontFamily: "RobotoMono", fontSize: 14,
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
    flex: 1, borderWidth: 2, borderColor: COLORS.primary, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8,
    fontFamily: "RobotoMono", fontSize: 14, color: COLORS.ink, backgroundColor: "#fff",
  },
  smallBtn: { fontSize: 18, marginHorizontal: 4 },

  addRow: {
    marginTop: 2, marginBottom: 10, marginLeft: 16,
  },

  ghostBtn: {
    borderWidth: 2, borderColor: COLORS.ink, borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 6,
  },
  ghostText: { fontFamily: "RobotoMono", color: COLORS.ink },

  primaryBtn: {
    borderWidth: 2, borderColor: COLORS.ink, borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 10,
  },
  primaryText: { fontFamily: "RobotoMono", color: COLORS.ink, fontSize: 16 },
});
