export default function TaskCard({ task, onEdit, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow-sm border">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{task.title}</h3>

          <div className="flex gap-2 mt-2 text-xs">
            <span className="px-2 py-1 rounded bg-gray-100">
              {task.status}
            </span>
            <span className="px-2 py-1 rounded bg-gray-100">
              {task.priority}
            </span>
          </div>
        </div>

        <div className="flex gap-2 text-sm">
          <button onClick={onEdit} className="text-blue-600">Edit</button>
          <button onClick={onDelete} className="text-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
}
