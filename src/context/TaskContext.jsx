import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("tasks"); 
            return saved ? JSON.parse(saved) : []; 
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (taskData) => { 
        const newTask = {
            id: `task_${Date.now()}`,
            title: taskData.title,
            description: taskData.description || "",
            status: "pending",
            priority: taskData.priority || "medium",
            dueDate: taskData.dueDate || null,
            assignedTo: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setTasks((prev) => [...prev, newTask]);
    };

    const updateTask = (taskId, updatedData) => { 
        setTasks((prev) =>
            prev.map((task) =>
                task.id === taskId 
                    ? { ...task, ...updatedData, updatedAt: new Date().toISOString() } 
                    : task
            )
        );
    };


    const deleteTask = (taskId) => { 
        setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    const getTaskById = (taskId) => {
        return tasks.find((task) => task.id === taskId);
    };


//     useEffect(() => {
//   window.addTask = addTask;
//   window.updateTask = updateTask;
//   window.deleteTask = deleteTask;
// }, [addTask, updateTask, deleteTask]);

    return (
        <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, getTaskById }}>
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}
