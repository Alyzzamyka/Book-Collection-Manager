import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAzD1ANYt-PZPn0HvAWZsyNGATot_opDr8",
  authDomain: "book-collection-manager-64239.firebaseapp.com",
  databaseURL: "https://book-collection-manager-64239-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "book-collection-manager-64239",
  storageBucket: "book-collection-manager-64239.firebasestorage.app",
  messagingSenderId: "1046994806381",
  appId: "1:1046994806381:web:d20c76d74aa1c393f8c164"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);