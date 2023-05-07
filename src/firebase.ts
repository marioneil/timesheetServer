import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const app = initializeApp({
  // @ts-ignore
  apiKey: "AIzaSyDc_qpvq3r_vMN3VAItl6BG7TBjkRR-tVQ",
  authDomain: "timesheet-dev-c0109.firebaseapp.com",
  projectId: "timesheet-dev-c0109",
  storageBucket: "timesheet-dev-c0109.appspot.com",
  messagingSenderId: "903627678830",
  appId: "1:903627678830:web:c679346a54cea78deaf27f",
});

export const auth = getAuth(app);
