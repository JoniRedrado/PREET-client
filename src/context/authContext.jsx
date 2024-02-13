import {auth} from "../firebase/firebase.config";
import { createContext, useContext, useState, useEffect } from "react";
import {GoogleAuthProvider,
        signInWithPopup,
        onAuthStateChanged
    } from "firebase/auth"

import { loginFireBase } from '../Components/Auth/Auth';

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if(!context) console.log("error creating auth context");
    
    return context;
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null)

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
           if(!currentUser){
            console.log("no user suscribet");
            setUser(null)
           }else{
            setUser(currentUser)
           }
        })
        return () => unsubscribe()
    },[])

    const loginWithGoogle = async () =>{
        try {
            const provider = new GoogleAuthProvider();
            const  {_tokenResponse, user}  = await signInWithPopup(auth, provider);
            
            if(_tokenResponse){
                const data = await loginFireBase(_tokenResponse);
                setUser(user);
                return data;
            }
        } catch (error) {
            console.error("Error logging in with Google:", error);
        }
    }

    return (
        <authContext.Provider 
            value={{
                loginWithGoogle,
                user
            }}
        >
            {children}
        </authContext.Provider>
    )
}