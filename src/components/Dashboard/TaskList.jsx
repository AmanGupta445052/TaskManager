import TaskCard from "./TaskCard";

export default function TaskList({ tasks = [], onEdit, onDelete }) {
  if (!tasks.length) {
    return (
      <p className="text-gray-500 text-center">
        No tasks yet. Create one!
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={() => onEdit(task)}   onDelete={() => onDelete(task)}/>
      ))}
    </div>
  );
}
