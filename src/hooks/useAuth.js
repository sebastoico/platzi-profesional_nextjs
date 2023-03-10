import React, { useState, useContext, createContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import endPoints from '@services/api/';

const AuthContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signIn = async (email, password) => {
    const options = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { access_token },
    } = await axios.post(endPoints.auth.login, { email, password }, options);
    if (access_token) {
      Cookies.set('token', access_token, { expires: 3 });

      axios.defaults.headers.Authorization = `Bearer ${access_token}`;
      const { data: userInfo } = await axios.get(endPoints.auth.profile);
      setUser(userInfo);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    delete axios.defaults.headers.Authorization;
    window.location.href = '/login';
  };

  return {
    user,
    signIn,
    logout,
  };
}
