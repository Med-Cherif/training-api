import React, { use, useEffect, useState } from "react";
import { delay, User } from "../../App";

const ExampleOne = () => {
  const [users, setUsers] = useState<User[]>([]);

  // handle data loading
  const [isLoading, setIsLoading] = useState(false);

  // handling errors
  const [errors, setErrors] = useState<string | null>(null);

  const getUsers = async () => {
    setIsLoading(true);

    await delay();

    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET",
    });

    if (!response.ok) {
      setIsLoading(false);
      setErrors("Failed to fetch data");
      return;
      // throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    setUsers(data);

    setIsLoading(false);
  };

  const refetch = () => {
    getUsers();
  };

  const addUser = (newUserData: any) => {
    setUsers((current) => {
      return [...current, newUserData];
    });
  };

  const deleteUser = (id: number) => {
    setUsers((current) => {
      return current.filter((user) => user.id !== id);
    });
  };

  const editUser = (id: number, newData: any) => {
    setUsers((current) => {
      return current.map((user) => {
        if (user.id === id) {
          return newData;
        }
        return user;
      });
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
      ) : errors ? (
        <p>{errors}</p>
      ) : (
        <div className="users-list">
          {users.map((user) => {
            return (
              <div key={user.id} className="user-card">
                <h2>{user.name}</h2>
              </div>
            );
          })}
        </div>
      )}
      <button onClick={refetch}>Refetch</button>
    </>
  );
};

export default ExampleOne;
