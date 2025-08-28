import CustomText from "../Components/CustomText";
import TodosSkeleton from "../Components/UI/TodosSkeleton";
import type { TodosResponse, Todo } from "../interface";
import { Statuses } from "../Data"; 
import Model from "../Components/UI/Model";
import { useState } from "react";
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
    const closeConfirmModal = () => setIsOpenConfirmModal(false);
    const openConfirmModal = () => setIsOpenConfirmModal(true);

  if (loading) return <TodosSkeleton intialofCard={5} />;

  if (error) return <p className="text-red-500">{error}</p>;

  if (!todos || todos.data.length === 0) return <p>No todos found.</p>;

  return (

    <div className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">

      {todos.data.map((todo) => {
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
              {/* show Status of Task  */}
              {matchedStatus && (
                <span
                  className={` inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${matchedStatus.color}`}
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
                onClick={() => {
                  openConfirmModal()
                }}
                className="text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-700 transition"
                title="Delete"
              >
                🗑
              </button>
            </div>
            <Model
              isOpen={isOpenConfirmModal}
              closeModal={closeConfirmModal}
              title="Are you sure you want to remove this Product from your Store?"
              description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
            >
              <div className="flex items-center space-x-3">
          <Button 
                variant={"danger"}
                fullWidth
                
                 onClick={() => {
                  onDeleteTodo?.(Number(todo.id));
                  closeConfirmModal();
                }}
                 type="button">
                  Yes, remove
          </Button>

          <Button 
                type="button"
                variant={"cancel"}
                 
                 onClick={closeConfirmModal}>
                  Cancel
          </Button>
              </div>
            </Model>
          </div>

        );
      })}

            
    </div>
  );
};

export default TodoLists;
