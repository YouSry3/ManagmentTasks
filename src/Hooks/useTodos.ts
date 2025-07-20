import { useEffect, useState, useCallback } from 'react';
import type { TodosResponse, Todo } from '../interface';
import axiosInstance from '../Config/Axios.config';

const useTodos = (token: string | undefined) => {
  const [todos, setTodos] = useState<TodosResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
      setError(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addTodo = (newTodo: Todo) => {
    setTodos((prev) => {
      if (!prev) return { data: [newTodo] };
      return { ...prev, data: [newTodo, ...prev.data] };
    });
  };

  const updateTodo = (updated: Todo) => {
    const updatedId = typeof updated.id === "number" ? updated.id : +updated.id;

    setTodos((prev) => {
      if (!prev) return null;

      const updatedList = prev.data.map((todo) =>
        +todo.id === updatedId ? { ...todo, ...updated } : todo
      );

      return { ...prev, data: updatedList };
    });
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => {
      if (!prev) return null;
      const newList = prev.data.filter((todo) => +todo.id !== id);
      return { ...prev, data: newList };
    });
  };

  ;

  useEffect(() => {
    if (token) fetchTodos();
  }, [token, fetchTodos]);

  return {
    todos,
    loading,
    error,
    refetch: fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    
  };
};

export default useTodos;
