import firebase from "firebase";
import { firebaseConfig } from "../config/firebaseConfig";

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();
