interface TodoCreationData {
  title: string;
}

interface Todo extends TodoCreationData {
  _id: string;
  completed: boolean;
  createdAt: string;
}

interface UserCreationData {
  name: string;
  age: number;
}

interface User extends UserCreationData {
  _id: string;
}
