export default function TaskFilters({
  filters,
  onChange,
  search,
  onSearch,
}) {
  return (
    <div className="flex flex-wrap gap-4 mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-64 dark:bg-gray-800"
      />

      <select
        value={filters.status}
        onChange={(e) =>
          onChange({ ...filters, status: e.target.value })
        }
        className="border rounded px-3 py-2 dark:bg-gray-800"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <select
        value={filters.priority}
        onChange={(e) =>
          onChange({ ...filters, priority: e.target.value })
        }
        className="border rounded px-3 py-2 dark:bg-gray-800"
      >
        <option value="all">All Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
}
