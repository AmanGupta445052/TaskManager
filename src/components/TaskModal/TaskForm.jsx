import { useEffect, useState } from "react";
import { useTasks } from "../../context/TaskContext";
import { useToast } from "../Common/Toast";


export default function TaskForm({ onClose, editingTask }) {
  const { addTask, updateTask } = useTasks();

  const { showToast } = useToast();

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState("medium");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setStatus(editingTask.status);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title is required");
      return;
    }

    const payload = { title, status, priority };

    if (editingTask) {
      updateTask(editingTask.id, payload);
      showToast("Task updated successfully");
    } else {
      addTask(payload);
      showToast("Task updated successfully");
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Task Title
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Priority
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
          Cancel
        </button>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingTask ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
}
