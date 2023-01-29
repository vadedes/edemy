//Store login user state and other global states

import create from '@ant-design/icons/lib/components/IconFont';
import { useReducer, createContext, useEffect } from 'react';

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

  //check localStorage if user exists, then use the saved data, otherwise proceed as normal
  useEffect(() => {
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    });
  }, []);

  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

export { Context, Provider };
