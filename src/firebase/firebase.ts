// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User,
    NextOrObserver,
  } from "firebase/auth";
  import { getFirestore, doc, getDoc, setDoc,QueryDocumentSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbfpc4cMifThQlZq33depiKrHEmxZ57nM",
  authDomain: "daraz-1d259.firebaseapp.com",
  projectId: "daraz-1d259",
  storageBucket: "daraz-1d259.appspot.com",
  messagingSenderId: "669775945690",
  appId: "1:669775945690:web:995687b48da6c1b6f52ae3",
  measurementId: "G-CCF9HWWXJD"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
  });
  
  export const auth = getAuth();

  export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
  };

  export const createUserAuthWithEmailAndPassword=(email:string,password:string)=>{
    if(!email || !password) return
    return createUserWithEmailAndPassword(auth,email,password)
  }
  
  export const AuthsignInWithEmailAndPassword=(email:string,password:string)=>{
    if(!email || !password) return
    return signInWithEmailAndPassword(auth,email,password)
  }

  export const UsersignOut=async ()=>{
    return await signOut(auth)
  }

  const db = getFirestore();
  // console.log("Db",db)
  export type ObjectsToAdd={
    title:string
  }
  
  export type UserData={
    displayName:string;
    createdAt:Date;
    email:string;
  
  }
  
  export const createUserDocumentFromAuth = async (userAuth:User,additionalInformation={}):Promise<void |QueryDocumentSnapshot<UserData>> => {
    console.log("User Auth From FireBase:",userAuth)
    if(!userAuth) return;
    
    const userDocRef = doc(db, "darazusers", userAuth.uid);
  
    console.log("userDocRef", userDocRef);
  
    const userSnapShot = await getDoc(userDocRef);
    console.log("UserSnapShot:",userSnapShot);
    console.log(userSnapShot.exists());
  
    if (!userSnapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef,{
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (error) {
        console.log(error);
      }
    }
  
    return userSnapShot as QueryDocumentSnapshot<UserData>
  };
  

  export const onAuthStateChangedListner=(callback:NextOrObserver<User>)=>{
    // console.log("hello....")
    return onAuthStateChanged(auth,callback)
  }