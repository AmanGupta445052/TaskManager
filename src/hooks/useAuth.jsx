import { useAuthContext } from "../context/AuthContext";

//This is a custom hook that makes sure the component
//  trying to use "Auth" data actually has access to it.
export default function useAuth(){
    const context  = useAuthContext();
  /*The "Error" Check: It checks if context exists. If you try to use useAuth() 
   in a component that is not wrapped inside the <AuthProvider>, 
  the app will "crash" with a clear message: "You forgot to wrap this in the AuthProvider!" */
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}