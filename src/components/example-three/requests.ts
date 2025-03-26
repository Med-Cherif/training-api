import axios from "axios";

const httpRequest = axios.create({
  baseURL: "http://localhost:3000",
});

export interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

export const getTodos = async () => {
  const response = await httpRequest.get("/todos");

  return response.data.data;
};

export const getTodoDetails = async (id: string) => {
  const response = await httpRequest.get(`/todos/${id}`);

  return response.data.data;
};

export const addNewTodo = async (data: any) => {
  const response = await httpRequest.post("/todos", data);
  return response.data.data;
};
