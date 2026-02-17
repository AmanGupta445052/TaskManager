import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useTasks } from "../../context/TaskContext";
import TaskCard from "./TaskCard";

const COLUMNS = [
  { id: "pending", title: "Pending" },
  { id: "in-progress", title: "In Progress" },
  { id: "completed", title: "Completed" },
];

export default function KanbanBoard({ tasks }) {
  const { updateTask } = useTasks();

  const onDragEnd = (result) => {
    const { destination, draggableId } = result;
    if (!destination) return;

    updateTask(draggableId, {
      status: destination.droppableId,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {COLUMNS.map((col) => {
          const columnTasks = tasks.filter(
            (task) => task.status === col.id
          );

          return (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`p-3 rounded min-h-[400px] backdrop-blur transition-colors ${
                      snapshot.isDraggingOver
                    ? "bg-blue-200/70"
                    : "bg-white/70 dark:bg-gray-800/70"
                     }`}
                >
                  <h3 className="font-semibold mb-3 flex justify-between">
                    {col.title}
                    <span>{columnTasks.length}</span>
                  </h3>

                  <div className="space-y-3">
                    {columnTasks.map((task, index) => (
                      <Draggable
                        draggableId={task.id}
                        index={index}
                        key={task.id}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`transition-transform ${
                              snapshot.isDragging
                                ? "rotate-1 shadow-lg"
                                : ""
                            }`}
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
