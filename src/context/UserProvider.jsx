import { createContext, useEffect, useState } from "react"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth } from "../../firebase"

export const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const onSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { email, displayName, photoURL, uid } = user
                setUser({ email, displayName, photoURL, uid })
            } else {
                setUser(null)
            }
        })

        return () => onSubscribe()
    }, [])
    

    const registerUser = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        signOut(auth)
    }

    return (
        <UserContext.Provider value={{ user, setUser, registerUser, loginUser, signOutUser, loading, setLoading }}>
            { children }
        </UserContext.Provider>
    )
}