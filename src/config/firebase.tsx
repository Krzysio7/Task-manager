import * as firebase from "firebase";

import { FirebaseConfig } from "./dev";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const listsRef = databaseRef;