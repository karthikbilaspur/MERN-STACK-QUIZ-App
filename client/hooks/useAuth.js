import { useState, useEffect } from 'react';
import { authenticate } from '../helper/auth';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authenticate(token).then((response) => {
        setAuthenticated(response.success);
      });
    }
  }, []);

  return { authenticated };
};

export default useAuth;