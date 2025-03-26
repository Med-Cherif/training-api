import { useQuery } from "@tanstack/react-query";
import { User } from "../../App";

const ExampleTwo = () => {
  const query = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("");
      }

      const data = await response.json();

      return data;
    },
  });

  return (
    <>
      {query.isLoading || query.isFetching ? (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : query.error ? (
        <p>Failed to fetch data</p>
      ) : (
        <div className="users-list">
          {query.data.map((user: User) => {
            return (
              <div key={user.id} className="user-card">
                <h2>{user.name}</h2>
              </div>
            );
          })}
        </div>
      )}

      <div>
        <input placeholder="Name" />
        <button>Add User</button>
      </div>
      <button onClick={() => query.refetch()}>Refetch</button>
    </>
  );
};

export default ExampleTwo;
