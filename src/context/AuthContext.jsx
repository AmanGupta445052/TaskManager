import {createContext,useContext} from 'react';
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
  const [user,setUser] = useLocalStorage("session",null);
  const [users,setUsers] = useLocalStorage("users",[]);

  
  const signup = async (newUser) => {
    // prevent duplicate email
    const exists = users.find(u => u.email === newUser.email);
    if (exists) {
      return false;
    }

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);

    return true;
  };


  const login = (email, password) => {
  if (!Array.isArray(users)) {
    return false;
  }

  const found = users.find(
    u => u.email === email && u.password === password
  );

  if (!found) return false;

  setUser(found);
  return true;
};

  const logout = () => {
    setUser(null);
  }

  return (
   <AuthContext.Provider value={
    {
        isAuthenticated : !!user,
        login,
        signup,
        logout,
        user
    }
   }>
    {children}
   </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext);
// This is a custom shortcut. Instead of typing useContext(AuthContext) in every file, 
// your components can just call useAuthContext() to "tune in" to the station
