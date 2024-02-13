export interface UserState {
    users: User[];
    selectedUser: User | null;
    error: string | null;
  }
  
  export interface User {
    id: number;
    name: string;
    email: string;
  }