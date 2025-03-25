import React from "react";
import TodoItem from "./TodoItem";

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: "1", task: "Walk the dog", completed: false },
  { id: "2", task: "Read a book", completed: false },
  { id: "3", task: "Reply to emails", completed: true },
];

const TodoList = () => {
  const isListEmpty = todos.length === 0;

  return (
    <ul className="todo-list">
      {isListEmpty ? (
        <p>List is empty</p>
      ) : (
        todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })
      )}
    </ul>
  );
};

export default TodoList;
