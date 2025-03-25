import React from "react";
import TodoItem from "./TodoItem";

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

let todos: Todo[] = [
  { id: "1", task: "Walk the dog", completed: false },
  { id: "2", task: "Read a book", completed: false },
  { id: "3", task: "Reply to emails", completed: true },
];

const TodoList = () => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return <TodoItem key={todo.id} {...todo} />;
      })}
    </ul>
  );
};

export default TodoList;
