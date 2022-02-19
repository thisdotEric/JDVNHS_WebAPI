import { createContext } from 'react';

export interface User {
  user_id: string;
  role: 'teacher' | 'student';
  first_name: string;
  middle_name: string;
  last_name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
});

export default UserContext;
