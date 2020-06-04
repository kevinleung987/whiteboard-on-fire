const databaseURL =
  // eslint-disable-next-line no-restricted-globals
  location.hostname === "localhost"
    ? "http://localhost:9000/?ns=fir-firstweek"
    : "https://fir-firstweek.firebaseio.com";

export const firebaseConfig = {
  apiKey: "AIzaSyCbWB8Vf9cX4tHozXCVFTj2eH2K9nBYEs0",
  authDomain: "fir-firstweek.firebaseapp.com",
  databaseURL,
  projectId: "fir-firstweek",
  storageBucket: "fir-firstweek.appspot.com",
  messagingSenderId: "940617187800",
  appId: "1:940617187800:web:d0006ab8a5cf892d5b32ad",
  measurementId: "G-YGNZG7KEQH",
};
