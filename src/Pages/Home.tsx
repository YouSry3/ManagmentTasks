import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../Auth/AuthContext";
import axiosInstance from "../Config/Axios.config";
import toast from "react-hot-toast";
import {  PencilLine } from "lucide-react";

import type { Todo, IStatus } from "../interface";
import { Statuses, FormTodo } from "../Data";

import Button from "../Components/UI/Button";
import Input from "../Components/UI/Input";
import Model from "../Components/UI/Model";
import InputErrorMessage from "../Components/Error/InputErrorMessage";
import Select from "../Components/UI/Select";
import TodoLists from "./TodoLists";

import useTodos from "../Hooks/useTodos";

const Home = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<IStatus>(Statuses[0]);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);

  const {
    todos,
    loading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    
  } = useTodos(user?.jwt);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    reset({
      title: "",
      description: "",
      todo_status: Statuses[0].name,
    });
    setIsOpen(false);
    setEditTodo(null);
    setSelectedStatus(Statuses[0]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Todo>({
    defaultValues: {
      todo_status: Statuses[0].name,
    },
  });

  const onSubmit = async (data: Todo) => {
    const fullData = {
      ...data,
      todo_status: selectedStatus.name,
    };

    try {
      if (editTodo) {
        const response = await axiosInstance.put(
          `/todos/${editTodo.id}`,
          { data: fullData },
          {
            headers: {
              Authorization: `Bearer ${user?.jwt}`,
            },
          }
        );

        if (response.status === 200) {
          updateTodo(response.data.data);
        toast.success(
        <div className="flex items-center gap-2">
          <PencilLine className="text-green-500 w-5 h-5" />
          <span>Todo updated successfully</span>
        </div>
      );
          closeModal();
        }
      } else {
        const response = await axiosInstance.post(
          "/todos",
          { data: fullData },
          {
            headers: {
              Authorization: `Bearer ${user?.jwt}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          addTodo(response.data.data);
          toast.success("Todo created ✅");
          closeModal();
        }
      }
    } catch (error) {
      toast.error("Something went wrong ❌");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <Button variant="default" onClick={openModal}>
          Add New Todo
        </Button>
      </div>

      <TodoLists
        todos={todos!}
        loading={loading}
        error={error}
        onEditTodo={(todo) => {
          setEditTodo(todo);
          const foundStatus = Statuses.find((s) => s.name === todo.todo_status);
          if (foundStatus) setSelectedStatus(foundStatus);
          setIsOpen(true);
          setTimeout(() => reset(todo), 0);
        }}
        onDeleteTodo={async (id) => {
          try {
            await axiosInstance.delete(`/todos/${id}`, {
              headers: {
                Authorization: `Bearer ${user?.jwt}`,
              },
            });
            deleteTodo(id);
            toast.success("Todo deleted ❌");
          } catch {
            toast.error("Failed to delete");
          }
        }}
    
      />

      <Model
        isOpen={isOpen}
        closeModal={closeModal}
        title={editTodo ? "Edit Todo" : "Add Todo"}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-w-md mx-auto"
        >
          <div className="mb-4">
            <label>Status</label>
            <Select selected={selectedStatus} setSelected={setSelectedStatus} />
          </div>

          {FormTodo.map(({ name, placeholder, type, validation }, idx) => (
            <div key={idx} className="mb-4">
              <label>{name}</label>
              {name === "description" ? (
                <textarea
                  placeholder={placeholder}
                  className="w-full rounded-md border mt-3 px-3 py-2"
                  rows={4}
                  {...register(name, validation)}
                />
              ) : (
                <Input
                  placeholder={placeholder}
                  type={type}
                  {...register(name, validation)}
                />
              )}
              {errors[name] && (
                <InputErrorMessage
                  msg={errors[name]?.message as string}
                />
              )}
            </div>
          ))}

          <div className="flex justify-end space-x-2 mt-5">
            <Button type="submit" fullWidth variant="default">
              {editTodo ? "Update" : "Create"}
            </Button>
            <Button type="button" onClick={closeModal} fullWidth variant="cancel">
              Cancel
            </Button>
          </div>
        </form>
      </Model>
    </>
  );
};

export default Home;
