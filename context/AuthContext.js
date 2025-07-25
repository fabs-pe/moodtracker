'use client'

import { auth, db, googleProvider } from "../filebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, { useContext, useState, useEffect } from "react"

const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({ children }){
    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] =useState(null)
    const [loading, setLoading ] = useState(true)
    //  const [authError, setAuthError] = useState(false)

    // AUTH HANDLERS
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
        
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout(){
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() =>{
        const unsubscribe = onAuthStateChanged(auth, async user =>{
            try{
                // set user to local context state
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    console.log('No user found')
                    return
                }

                // if user exist fetch data from firebase
                const docRef = doc(db, 'users', user.uid) 
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()){
                    console.log('found user data')
                    firebaseData = docSnap.data()
                
                }

                setUserDataObj(firebaseData)

            }catch (err) {
                console.log(err.message)
            } finally{
                setLoading(false)
            }
        })
        return unsubscribe
    }, [])

    const signInWithGoogle  = async () => {
        try{
        await signInWithPopup(auth, googleProvider)
        } catch (err){
            console.error(err)
        }

    }



    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        signInWithGoogle,
        loading


    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}