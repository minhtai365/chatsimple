import React from "react";
import { auth, db } from "../services/firebase";

function createAcc(email, password) {
 
}
// function Add(name) {
//   console.log("aaddd");
//   console.log(auth().currentUser.uid);

  
  
// }
export function signup(email, password) {
  // console.log(name);
  return auth().createUserWithEmailAndPassword(email, password);
}
export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
  
}
export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();

  // console.log(provider);
  return auth().signInWithPopup(provider);
}
