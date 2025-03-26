import { useQuery } from "@tanstack/react-query";
import { getTodoDetails } from "./requests";

const SelectedTodo = ({ id }: { id: string | null }) => {
  const isIdExists = !!id;

  // react query refetches data whenever key is changed
  const query = useQuery({
    enabled: isIdExists,
    queryKey: ["todos", "details", id],
    queryFn: () => getTodoDetails(id as string),

    // state time means do not send request after this millisecond time
    // staleTime: 5 * 60 * 1000,

    // cache time is the time when react query serve the data from it
    // gcTime: 5 * 60 * 1000
  });

  if (query.isLoading) return "loading ...";
  if (query.error) return "error";

  if (!query.data) return null;

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      The selected todo is {query.data.task} and it is{" "}
      {query.data.completed ? "Completed" : "Uncompleted"}
    </div>
  );
};

export default SelectedTodo;
