import React, { useState, useEffect } from "react";

import api from "../../api/users";

function UserList() {
  const [users, setUsers] = useState<User[]>([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState(12);

  const fetchUsers = async () => {
    const data = await api.get();

    setUsers(data);
  };

  const createUser = async (user: UserCreationData) => {
    await api.post(user);

    fetchUsers();
  };

  const handleCreateFormSubmit = (e: any) => {
    e.preventDefault();

    createUser({ name, age });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setAge(12);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <form onSubmit={handleCreateFormSubmit}>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          name="age"
          value={age}
          onChange={(e) => setAge(+e.target.value)}
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <div key={user._id}>
              <span>{user.name}</span>
              <span>{user.age}</span>
            </div>
          );
        })}
      </ul>
    </div>
  );
}

export default UserList;
