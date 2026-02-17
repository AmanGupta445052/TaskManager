import TaskForm from "./TaskForm";

export default function TaskModal({ onClose,editingTask }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">{editingTask ? "Create Task" : "Edit Task"}</h2>

        <TaskForm onClose={onClose} editingTask={editingTask} />
      </div>
    </div>
  );
}
