import React, { createContext, useState, useEffect } from 'react';

import { onAuthStateChangedListner, createUserDocumentFromAuth } from './firebase/firebase';

export interface IUserContext {
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  currentUser: any;
}

export const UserContext = createContext<IUserContext>({
  setCurrentUser: () => null,
  currentUser: null,
});

export const UserProvider: React.FC = ({ children }:any) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const value: IUserContext = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListner((user) => {
        console.log("user Listiner:",user)
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
