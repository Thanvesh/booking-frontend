import { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import api from '../api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!userId) {
          console.log('No user ID found');
          return;
        }

        const { data } = await api.get(`/auth/user/${userId}`);
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, [userId]);

  return { user };
};
