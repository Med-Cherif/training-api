import React, { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewTodo, Todo } from "./requests";

const AddTodo = () => {
  const [task, setTask] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables: any) => addNewTodo(variables),

    // it fires before request sent
    // we use it in **Optimistic Updates** in general
    onMutate(variables) {},

    // if success
    onSuccess(data, variables, context) {
      // queryClient.invalidateQueries({
      //   queryKey: ["todos", "list"],
      // });

      queryClient.setQueriesData(
        {
          queryKey: ["todos", "list"],
        },
        (current) => {
          return [...(current as Todo[]), data];
        }
      );

      // console.log("Success From Mutation");
    },

    // if error
    onError(error, variables, context) {
      console.log("Error From Mutation");
    },
  });

  const handleAdd = async () => {
    // await mutation.mutateAsync({}, {})

    mutation.mutate(
      {
        task,
        completed: false,
      },
      {
        onSuccess(data, variables, context) {
          setTask("");
        },
        onError(error, variables, context) {
          console.log("Error From Function");
        },
      }
    );
  };

  return (
    <div className="add-todo-wrapper">
      <input
        placeholder="Add new todo"
        className="add-todo-input"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        disabled={mutation.isPending}
        onClick={handleAdd}
        className="add-todo-button"
      >
        {mutation.isPending ? "loading..." : "Add"}
      </button>
    </div>
  );
};

export default AddTodo;
