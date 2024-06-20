"use client";

import { Button } from "./ui/button";

type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

type TodoListProps = {
  todos: Todo[];
  onRemove: (id: number) => void;
  onToggleComplete: (id: number) => void;
};

const TodoList = ({ todos, onRemove, onToggleComplete }: TodoListProps) => {
  return (
    <div className="space-y-4 w-full my-4 max-w-sm">
      {todos.map((todo) => (
        <div key={todo.id} className="flex items-center space-x-4">
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => onToggleComplete(todo.id)}
          />
          <span
            className={
              todo.isCompleted ? "text-white line-through" : "text-white"
            }
          >
            {todo.title}
          </span>
          <Button variant="secondary" onClick={() => onRemove(todo.id)}>
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
