import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTE_KEY    = "tasks.note.v1";
const STORAGE_KEY = "tasks.v1";
const ANIM_KEY    = "tasks.anim.v1";      // ⬅️ کلید ذخیره انیمیشن انتخابی

const TasksCtx = createContext(null);

// todo | done | skipped
const initialTasks = [
  { id: "t1", title: "Wake up at 8:00 AM",   status: "todo" },
  { id: "t2", title: "Go to confrence!",     status: "todo" },
  { id: "t3", title: "Go to the bank",       status: "todo" },
  { id: "t4", title: "Go back home at 8:00", status: "todo" },
];

export function TasksProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [note, setNote]   = useState(
    "I have to go to the conference at the university at 3 PM!\nAfter that, I will go to the bank. I have an interview with a company at 6 PM."
  );
  const [animId, setAnimId] = useState("a1"); // ⬅️ پیش‌فرض یکی از انیمیشن‌ها
  const [loaded, setLoaded] = useState(false);

  // --- Load from storage
  useEffect(() => {
    (async () => {
      try {
        const rawTasks = await AsyncStorage.getItem(STORAGE_KEY);
        if (rawTasks) {
          const parsed = JSON.parse(rawTasks);
          if (Array.isArray(parsed)) setTasks(parsed);
        }

        const rawNote = await AsyncStorage.getItem(NOTE_KEY);
        if (rawNote) setNote(rawNote);

        const rawAnim = await AsyncStorage.getItem(ANIM_KEY);
        if (rawAnim) setAnimId(rawAnim);
      } catch (e) {
        console.warn("load tasks/note/anim failed:", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // --- Save whenever tasks, note, or animId change
  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((e) =>
      console.warn("save tasks failed:", e)
    );
  }, [tasks, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(NOTE_KEY, note).catch((e) =>
      console.warn("save note failed:", e)
    );
  }, [note, loaded]);

  useEffect(() => {
    if (!loaded) return;
    AsyncStorage.setItem(ANIM_KEY, animId).catch((e) =>
      console.warn("save anim failed:", e)
    );
  }, [animId, loaded]);

  // --- Actions (tasks)
  const addTask = (title = "New task…", status = "todo") =>
    setTasks((prev) => [...prev, { id: `t${prev.length + 1}`, title, status }]);

  const setStatus = (id, status) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

  const toggleDone = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t
      )
    );

  const renameTask = (id, title) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));

  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));

  // --- Action (animation)
  const setAnimation = (id) => setAnimId(id); // ⬅️ برای انتخاب انیمیشن سراسری

  const value = useMemo(
    () => ({
      // tasks
      tasks, addTask, setStatus, toggleDone, renameTask, deleteTask,
      // note
      note, setNote,
      // animation
      animId, setAnimation,
    }),
    [tasks, note, animId]
  );

  if (!loaded) return null; // جلوگیری از چشمک‌زدن اولیه

  return <TasksCtx.Provider value={value}>{children}</TasksCtx.Provider>;
}

export const useTasks = () => {
  const ctx = useContext(TasksCtx);
  if (!ctx) throw new Error("useTasks must be used inside <TasksProvider />");
  return ctx;
};
