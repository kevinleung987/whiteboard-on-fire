import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();
export const currentBoard = () => {
  const pathname = window.location.pathname.slice(
    1,
    window.location.pathname.length
  );
  if (pathname.length === 0) {
    return "default";
  }
  return pathname;
};
