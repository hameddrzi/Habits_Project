# 📌 Habit & To-Do App  

A mobile application built with **React Native (Expo)** for managing daily habits and tasks.  
This project uses **Context API + AsyncStorage** for persistent state management and **Lottie Animations** for an engaging user experience.  

---

## ✨ Features

- 📋 **Task Management**: Add, edit, and delete tasks  
- ✅ **Task Status Tracking**: switch between *Todo* → *Done* → *Skipped*  
- ⏳ **Progress Tracking**: Donut chart (weekly overview) and smooth cumulative progress chart  
- 📝 **Daily Note**: editable activity/note card  
- 🎬 **Custom Animations**: select and display Lottie animations for cards and activities  
- 💾 **Persistent Storage** with **AsyncStorage** (data is saved even after closing the app)  
- 🎨 **Clean UI/UX** designed with custom themes and fonts  

---

## 📱 Screenshots  

*(Add screenshots of Home, ToDo, and EditActivity screens here)*  

---

## 🚀 Installation  

### Prerequisites
- Node.js (>= 18)  
- Expo CLI installed globally  

```bash
npm install -g expo-cli
```

### Clone the repository
```bash
git clone https://github.com/your-username/habit-todo-app.git
cd habit-todo-app
```

### Install dependencies
```bash
npm install
```

### Run the app
```bash
npx expo start
```

---

## 🗂️ Project Structure  

```
habit-todo-app/
│── App.js                     # Entry point with Navigation + Context Provider
│── assets/                    # Images, Lottie animations
│── src/
│   ├── component/
│   │   ├── screens/
│   │   │   ├── HomeScreen.js
│   │   │   ├── ToDoScreen.js
│   │   │   └── EditActivityScreen.js
│   │   ├── HabitCard.js
│   │   ├── DonutChart.js
│   │   ├── BottomNav.js
│   │   └── Header.js
│   ├── state/
│   │   └── TasksContext.js    # Context API + AsyncStorage persistence
│   └── theme.js               # Colors & spacing constants
└── ui-font/                   # Custom fonts (RobotoMono)
```

---

## ⚙️ Tech Stack  

- **React Native (Expo)**  
- **React Navigation** (stack navigation)  
- **Context API** (global state management)  
- **AsyncStorage** (local persistent storage)  
- **Lottie for React Native** (animations)  

---

## 📖 Usage  

- **Add Task**: Press the *Add Task* button or go to *EditActivity* screen  
- **Mark as Done**: Tap on the circle checkbox  
- **Skip Task**: Long press on the circle checkbox  
- **Edit Note**: Tap the arrow button in the activity card  
- **Change Animation**: Choose from available Lottie files in the `assets/animate/` folder  

---

## 🛠️ Future Improvements  

- 🔔 Notifications & reminders  
- 📊 Weekly & monthly reports  
- 🌐 Cloud sync with Firebase/Backend  
- 👤 User authentication  

---

 
