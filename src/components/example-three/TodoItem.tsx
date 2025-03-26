import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, editTodo, Todo } from "./requests";
import { useState } from "react";

interface TodoItem extends Todo {
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}

const TodoItem = ({ task, completed, id, setSelectedId }: TodoItem) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess(data) {
      queryClient.setQueriesData(
        {
          queryKey: ["todos", "list"],
        },
        (current) => {
          if (!current) return [];

          return (current as Todo[]).filter((todo) => {
            return todo.id !== data;
          });
        }
      );

      // exact: true by default
      queryClient.setQueryData(["todos", "details", data], () => {
        return null;
      });

      // queryClient.removeQueries({
      //   queryKey: ["todos", "details", data],
      // });
    },
    onError(error) {
      console.log(error);
    },
  });

  const completeMutation = useMutation({
    mutationFn: (variables: any) =>
      editTodo(variables.id, { completed: variables.completed }),
    onSuccess(data) {
      // queryClient.invalidateQueries({ queryKey: ["todos"] });

      queryClient.setQueriesData(
        {
          queryKey: ["todos", "list"],
        },
        (current) => {
          return (current as Todo[]).map((todo) => {
            if (todo.id === data.id) {
              return data;
            }
            return todo;
          });
        }
      );

      queryClient.setQueryData(["todos", "details", data.id], () => data);

      // console.log({ data });
    },
    onError() {
      console.log("error");
    },
  });

  return (
    <li className={`todo-item ${completed ? "todo-item-completed" : ""}`}>
      <h2 onClick={() => setSelectedId(id)}>{task}</h2>
      <div className="todo-actions">
        {completed ? (
          <></>
        ) : (
          <button
            onClick={() => completeMutation.mutate({ id, completed: true })}
            className="todo-action todo-action-complete"
          >
            Complete
          </button>
        )}

        <button
          onClick={() => deleteMutation.mutate(id)}
          disabled={deleteMutation.isPending}
          className="todo-action todo-action-delete"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
