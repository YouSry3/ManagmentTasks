import { useState, useEffect } from "react";
import CustomText from "../Components/CustomText";
import TodosSkeleton from "../Components/UI/TodosSkeleton";
import { type TodosResponse, type Todo, BTNSFilterStatus } from "../interface";
import { Statuses } from "../Data"; 
import Model from "../Components/UI/Model";
import Button from "../Components/UI/Button";

interface ITodoListsProps {
  todos?: TodosResponse;
  loading: boolean;
  error: string | null;
  onEditTodo?: (todo: Todo) => void;
  onDeleteTodo?: (id: number) => void;
}

const TodoLists = ({
  todos,
  loading,
  error,
  onEditTodo,
  onDeleteTodo,
}: ITodoListsProps) => {
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  const closeConfirmModal = () => setIsOpenConfirmModal(false);
  const openConfirmModal = (todo: Todo) => {
    setTodoToDelete(todo);
    setIsOpenConfirmModal(true);
  };

  // 🆕 فلترة
  const [currentStatus, setCurrentStatus] = useState<string>("All");
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!todos?.data) return;

    if (currentStatus === "All") {
      setFilteredTodos(todos.data);
    } else {
      setFilteredTodos(
        todos.data.filter((todo) => todo.todo_status === currentStatus)
      );
    }
  }, [todos, currentStatus]);

  if (loading) return <TodosSkeleton intialofCard={5} />;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!todos || todos.data.length === 0) return <p>No todos found.</p>;

  return (
    <>
      {/* أزرار الفلترة */}
      <div className="filter flex items-center justify-center space-x-4 mt-4">
        {BTNSFilterStatus.map((status, index) => (
          <Button
            key={index}
            variant={status === currentStatus ? "primary" : "danger"}
            type="button"
            onClick={() => setCurrentStatus(status)}
          >
            {status}
          </Button>
        ))}
      </div>

      {/* todos */}
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {filteredTodos.map((todo) => {
          const matchedStatus = Statuses.find((s) => s.name === todo.todo_status);

          return (
            <div
              key={todo.id}
              className="max-w-sm w-full bg-gray-300 rounded-xl shadow-md p-6 space-y-4 border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div>
                  <CustomText
                    maxLength={15}
                    className="text-2xl font-semibold text-gray-800"
                    text={todo.title}
                  />
                  <CustomText
                    text={todo.description}
                    className="text-sm text-opacity-30 font-semibold text-gray-800"
                  />
                </div>
                {matchedStatus && (
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${matchedStatus.color}`}
                  >
                    {matchedStatus.label}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end space-x-4">
                <button
                  onClick={() => onEditTodo?.(todo)}
                  className="px-3 py-1 text-sm rounded-md border bg-gray-300 border-gray-150 hover:bg-gray-100"
                >
                  Edit ✏️
                </button>
                <button
                  onClick={() => openConfirmModal(todo)}
                  className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-700 transition"
                  title="Delete"
                >
                  🗑
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* modal delete */}
      {todoToDelete && (
        <Model
          isOpen={isOpenConfirmModal}
          closeModal={closeConfirmModal}
          title="Are you sure you want to remove this Todo?"
          description="Deleting this todo will remove it permanently. Please make sure this is the intended action."
        >
          <div className="flex items-center space-x-3">
            <Button
              variant={"danger"}
              fullWidth
              onClick={() => {
                onDeleteTodo?.(Number(todoToDelete.id));
                closeConfirmModal();
              }}
              type="button"
            >
              Yes, remove
            </Button>
            <Button type="button" variant={"cancel"} onClick={closeConfirmModal}>
              Cancel
            </Button>
          </div>
        </Model>
      )}
    </>
  );
};

export default TodoLists;
