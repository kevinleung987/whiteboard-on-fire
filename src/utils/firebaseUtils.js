import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../config/firebaseConfig";

initializeApp(firebaseConfig);
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
