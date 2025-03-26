import { Todo } from "./requests";

interface TodoItem extends Todo {
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TodoItem = ({ task, completed, id, setSelectedId }: TodoItem) => {
  return (
    <li className={`todo-item ${completed ? "todo-item-completed" : ""}`}>
      <h2 onClick={() => setSelectedId(id)}>{task}</h2>
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
