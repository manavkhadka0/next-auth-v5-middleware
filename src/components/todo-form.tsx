"use client";

import { useState, useEffect } from "react";
import {
  addTodoAction,
  getTodosAction,
  removeTodoAction,
  Todo,
  updateTodoAction,
} from "@/utils/todo-functions/todo-function";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/todo-list";

const todoInitialState = {
  title: "",
  errors: {
    title: "",
  },
};

const TodoForm = () => {
  const [formState, setFormState] = useState(todoInitialState);
  const [todos, setTodos] = useState<[] | Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodosAction();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formState.title) {
      setFormState({
        ...formState,
        errors: {
          title: "Title is required",
        },
      });
      return;
    }

    await addTodoAction({ title: formState.title });

    const updatedTodos = await getTodosAction();
    setTodos(updatedTodos);

    setFormState(todoInitialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
      errors: {
        ...formState.errors,
        [event.target.name]: "",
      },
    });
  };

  const handleRemove = async (id: number) => {
    await removeTodoAction(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = async (id: number) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
      await updateTodoAction(updatedTodo);
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo : todo)));
    }
  };

  return (
    <div className="space-y-4 w-full max-w-sm">
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        <Input
          name="title"
          placeholder="Todo title"
          value={formState.title}
          onChange={handleChange}
        />
        {formState.errors.title && (
          <p className="text-red-600">{formState.errors.title}</p>
        )}
        <Button variant="secondary" className="w-full" type="submit">
          Add Todo
        </Button>
      </form>
      {todos.length === 0 && <p className="text-white">No todos found</p>}
      {todos.length && (
        <TodoList
          todos={todos}
          onRemove={handleRemove}
          onToggleComplete={handleToggleComplete}
        />
      )}
    </div>
  );
};

export default TodoForm;
