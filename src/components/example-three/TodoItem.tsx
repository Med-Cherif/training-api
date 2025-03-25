import React from "react";
import { Todo } from "./TodoList";

const TodoItem = ({ task, completed }: Todo) => {
  return (
    <li className="todo-item">
      <h2>{task}</h2>
      <div className="todo-actions">
        {completed ? (
          <></>
        ) : (
          <button className="todo-action todo-action-complete">Complete</button>
        )}

        <button className="todo-action todo-action-delete">Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
