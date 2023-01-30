//Store login user state and other global states

import create from '@ant-design/icons/lib/components/IconFont';
import { useReducer, createContext, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

//set initial state of user
const initialState = {
  user: null,
};

//create context
const Context = createContext();

//create reducer function that will be responsible to update the state and access the data from the state
//root reducer - common term
const rootReducer = (state, action) => {
  //think of action types as a string value
  //update the state when users make a request
  //everytime we dispatch actions we dispatch the "type" and the payload
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    default:
      return state;
  }
};

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  //router
  const router = useRouter();

  //check localStorage if user exists, then use the saved data, otherwise proceed as normal
  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  //logic when token expires, make request to the backend to clear the token from the cookie, empty the user from the context in our frontend and also from the local storage
  //use axios interceptors to handle the response
  axios.interceptors.response.use(
    function (response) {
      //any status code that lie within the range of 2xx will cause this function
      //to trigger
      return response;
    },
    function (error) {
      //any status code that falls outside the range of 2xx will cause this function
      //to trigger
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios
            .get('/api/logout')
            .then((data) => {
              console.log('/401 error > logout');
              dispatch({ type: 'LOGOUT' });
              window.localStorage.removeItem('user');
              router.push('/login');
            })
            .catch((err) => {
              console.log('AXIOS INTERCEPTORS ERROR', err);
              reject(err);
            });
        });
      }
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token');
      console.log('CSRF', data);
      axios.defaults.headers['X-CSRF-Token'] = data.csrfToken;
    };

    getCsrfToken();
  }, []);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, Provider };
