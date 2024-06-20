"use client";

import { useState, useEffect } from "react";
import { z } from "zod";
import {
  addTodoAction,
  getTodosAction,
  removeTodoAction,
  updateTodoAction,
} from "@/utils/todo-functions/todo-function";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TodoList from "@/components/todo-list";

const todoInitialState = {
  title: "",
  errors: {
    title: "" as string | string[],
  },
};

const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

const TodoForm = () => {
  const [formState, setFormState] = useState({
    title: "",
    errors: {
      title: "" as string | string[],
    },
  });
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const fetchedTodos = await getTodosAction();
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const title = formData.get("title") as string;

    const validatedFields = todoSchema.safeParse({ title });

    if (!validatedFields.success) {
      setFormState({
        ...formState,
        errors: {
          title:
            validatedFields.error.flatten().fieldErrors.title?.[0] ||
            "Invalid title",
        },
      });
      return;
    }

    await addTodoAction({ title: validatedFields.data.title });

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
          <p className="text-red-600">
            {Array.isArray(formState.errors.title)
              ? formState.errors.title.join(", ")
              : formState.errors.title}
          </p>
        )}
        <Button variant="secondary" className="w-full" type="submit">
          Add Todo
        </Button>
      </form>
      <TodoList
        todos={todos}
        onRemove={handleRemove}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
};

export default TodoForm;
