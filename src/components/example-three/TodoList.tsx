import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { getTodos, Todo } from "./requests";
import SelectedTodo from "./SelectedTodo";
import { useEffect, useState } from "react";

const TodoList = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [status, setStatus] = useState("all");

  // React Query Send Request Whenever key changes
  const query = useQuery({
    placeholderData: [],
    queryKey: ["todos", "list", status],
    queryFn: () => getTodos(),
  });

  const isLoading = query.isLoading;
  const error = query.error;
  const todos = query?.data || [];

  const isListEmpty = todos.length === 0;

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <div>
      {/* <button onClick={() => setStatus("all")}>All</button>
      <button onClick={() => setStatus("completed")}>Completed</button>
      <button onClick={() => setStatus("uncompleted")}>Uncompleted</button> */}
      <ul className="todo-list">
        {isListEmpty ? (
          <p>List is empty</p>
        ) : (
          todos.map((todo: Todo) => {
            return (
              <TodoItem key={todo.id} setSelectedId={setSelectedId} {...todo} />
            );
          })
        )}
      </ul>

      <SelectedTodo id={selectedId} />
    </div>
  );
};

export default TodoList;
