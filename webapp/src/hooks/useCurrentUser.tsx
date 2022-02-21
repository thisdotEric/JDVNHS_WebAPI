import { useState, useEffect } from 'react';
import { axios } from '../utils';
import type { User } from '../context';

function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios.get('/api/auth/me').then(({ data }) => {
      setUser(data);
    });
  }, []);

  return user;
}

export default useCurrentUser;
