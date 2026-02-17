import { useEffect, useState } from "react";
import { useTasks } from "../context/TaskContext";
import TaskList from "../components/Dashboard/TaskList";
import TaskModal from "../components/TaskModal/TaskModal";
import DeleteConfirmModal from "../components/Common/DeleteConfirmModal";
import TaskFilters from "../components/Dashboard/TaskFilters";
import { useToast } from "../components/Common/Toast";
import KanbanBoard from "../components/Dashboard/KanbanBoard";

export function Dashboard() {
  const { tasks, deleteTask } = useTasks();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [view, setView] = useState("list");

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
  });

  const [search, setSearch] = useState("");
  const ITEMS_PER_PAGE = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const openCreateModel = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    deleteTask(taskToDelete.id);
    showToast("Task deleted");
    setTaskToDelete(null);
  };

  /* ---------------- FILTER + SEARCH ---------------- */

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filters.status === "all" || task.status === filters.status;

    const priorityMatch =
      filters.priority === "all" || task.priority === filters.priority;

    return statusMatch && priorityMatch;
  });

  const searchedTasks = filteredTasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------- PAGINATION ---------------- */

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, search]);

  const totalPages = Math.ceil(searchedTasks.length / ITEMS_PER_PAGE);

  const paginatedTasks = searchedTasks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="p-6  dark:bg-gray-400/80 backdrop-blur rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Tasks</h1>

        <button
          onClick={openCreateModel}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* VIEW TOGGLE */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView("list")}
          className={`px-3 py-1 rounded ${
            view === "list" ? "bg-blue-600 text-white" : "border"
          }`}
        >
          List
        </button>

        <button
          onClick={() => setView("kanban")}
          className={`px-3 py-1 rounded ${
            view === "kanban" ? "bg-blue-600 text-white" : "border"
          }`}
        >
          Kanban
        </button>
      </div>

      {view === "list" ? (
        <>
          <TaskFilters
            filters={filters}
            onChange={setFilters}
            search={search}
            onSearch={setSearch}
          />

          <TaskList
            tasks={paginatedTasks}
            onEdit={openEditModal}
            onDelete={(task) => setTaskToDelete(task)}
          />

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <KanbanBoard tasks={searchedTasks} />
      )}

      {isModalOpen && (
        <TaskModal
          onClose={() => setIsModalOpen(false)}
          editingTask={editingTask}
        />
      )}

      {taskToDelete && (
        <DeleteConfirmModal
          onConfirm={confirmDelete}
          onCancel={() => setTaskToDelete(null)}
        />
      )}
    </div>
  );
}
