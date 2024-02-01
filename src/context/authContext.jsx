import {auth} from "../firebase/firebase.config"
import { createContext, useContext } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context){
        console.log("error creating auth context");
    }
    return context;
}

export function AuthProvider({children}){

    const register = async (email, password) =>{
        const response = await createUserWithEmailAndPassword(auth, email, password)
        console.log(response);
    };

    const login = async( email, password) =>{
        const response =  await signInWithEmailAndPassword(auth, email,password)
        console.log(response)
    }

    return (
        <authContext.Provider 
            value={{
                register,
                login
            }}
        >
            {children}
        </authContext.Provider>
    )
}