import React from "react";

const AddTodo = () => {
  return (
    <div className="add-todo-wrapper">
      <input placeholder="Add new todo" className="add-todo-input" />
      <button className="add-todo-button">Add</button>
    </div>
  );
};

export default AddTodo;
