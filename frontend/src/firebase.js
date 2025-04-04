import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

/**
 * Add a new document to Firestore
 * @param {string} collectionName - Name of the collection
 * @param {object} data - Document data
 * @returns {Promise<string>} - Document ID
 */
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

/**
 * Get all documents from a collection
 * @param {string} collectionName
 * @returns {Promise<Array>} - Array of documents
 */
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

/**
 * Update a document
 * @param {string} collectionName
 * @param {string} docId
 * @param {object} updates
 */
export const updateDocument = async (collectionName, docId, updates) => {
  try {
    await updateDoc(doc(db, collectionName, docId), {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

/**
 * Delete a document
 * @param {string} collectionName
 * @param {string} docId
 */
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

/**
 * Upload file to Firebase Storage
 * @param {string} path - Storage path
 * @param {File} file - File to upload
 * @returns {Promise<string>} - Download URL
 */
export const uploadFile = async (path, file) => {
  try {
    const storageRef = ref(storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Error uploading file: ", error);
    throw error;
  }
};

// Export core services and common functions
export { db, auth, storage, collection, doc, serverTimestamp };

// Authentication functions
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
