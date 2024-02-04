import {auth} from "../firebase/firebase.config";
import { createContext, useContext, useState, useEffect } from "react";
import {GoogleAuthProvider,
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword,
        signInWithPopup,
        signOut,
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

    const register = async (email, password) =>{
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.error("Error registering user:", error);
        }
    };

    const login = async( email, password) =>{
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(response);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    }

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

    const logout = async () => {
        try {
            if(user === null) return;
            const response = await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    return (
        <authContext.Provider 
            value={{
                register,
                login,
                loginWithGoogle,
                logout,
                user
            }}
        >
            {children}
        </authContext.Provider>
    )
}