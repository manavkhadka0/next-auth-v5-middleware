// utils/localStorage.ts

export type Todo = {
  id: number;
  title: string;
  isCompleted: boolean;
};
export const setTodos = (todos: Todo[]): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

export const getTodos = (): Todo[] => {
  if (typeof window !== "undefined") {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  }

  return [];
};

export const addTodo = (todo: Todo): void => {
  const todos = getTodos();
  todos.push(todo);
  setTodos(todos);
};

export const removeTodo = (id: number): void => {
  let todos = getTodos();
  todos = todos.filter((todo) => todo.id !== id);
  setTodos(todos);
};

export const updateTodo = (updatedTodo: Todo): void => {
  const todos = getTodos();
  const todoIndex = todos.findIndex((todo) => todo.id === updatedTodo.id);
  if (todoIndex >= 0) {
    todos[todoIndex] = updatedTodo;
    setTodos(todos);
  }
};

export const addTodoAction = async (todo: { title: string }) => {
  const newTodo = {
    id: Date.now(),
    title: todo.title,
    isCompleted: false,
  };

  console.log(newTodo);
  addTodo(newTodo);
};

export const removeTodoAction = async (id: number) => {
  removeTodo(id);
};

export const updateTodoAction = async (todo: {
  id: number;
  title: string;
  isCompleted: boolean;
}) => {
  updateTodo(todo);
};

export const getTodosAction = async () => {
  return getTodos();
};
