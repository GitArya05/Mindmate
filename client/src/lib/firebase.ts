import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signInAnonymously, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import { getDatabase, ref, set, get, push, update, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "mindmate-app"}.firebaseapp.com`,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mindmate-app",
  storageBucket: `${import.meta.env.VITE_FIREBASE_PROJECT_ID || "mindmate-app"}.appspot.com`,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://mindmate-app-default-rtdb.firebaseio.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "demo-app-id",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

// Sign in anonymously
export const signInAnon = async () => {
  try {
    const result = await signInAnonymously(auth);
    return result.user;
  } catch (error) {
    console.error("Error signing in anonymously: ", error);
    throw error;
  }
};

// Sign out
export const signOut = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("Error signing out: ", error);
    throw error;
  }
};

// Get current user
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listen to auth state changes
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Database operations
export const saveMoodEntry = async (userId: string, mood: string, note: string = "") => {
  try {
    const newEntryRef = push(ref(database, `moodEntries/${userId}`));
    await set(newEntryRef, {
      mood,
      note,
      timestamp: Date.now()
    });
    return newEntryRef.key;
  } catch (error) {
    console.error("Error saving mood entry: ", error);
    throw error;
  }
};

export const getMoodEntries = async (userId: string, days: number = 7) => {
  try {
    const startTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    const entriesRef = ref(database, `moodEntries/${userId}`);
    const snapshot = await get(entriesRef);
    
    if (snapshot.exists()) {
      const entries = snapshot.val();
      return Object.keys(entries)
        .map(key => ({
          id: key,
          ...entries[key]
        }))
        .filter(entry => entry.timestamp >= startTime)
        .sort((a, b) => a.timestamp - b.timestamp);
    }
    return [];
  } catch (error) {
    console.error("Error getting mood entries: ", error);
    throw error;
  }
};

export const saveThoughtPost = async (userId: string, content: string) => {
  try {
    const newPostRef = push(ref(database, 'thoughtPosts'));
    await set(newPostRef, {
      userId,
      content,
      likes: 0,
      timestamp: Date.now()
    });
    return newPostRef.key;
  } catch (error) {
    console.error("Error saving thought post: ", error);
    throw error;
  }
};

export const likeThoughtPost = async (postId: string) => {
  try {
    const postRef = ref(database, `thoughtPosts/${postId}`);
    const snapshot = await get(postRef);
    
    if (snapshot.exists()) {
      const post = snapshot.val();
      await update(postRef, {
        likes: post.likes + 1
      });
      return post.likes + 1;
    }
    return null;
  } catch (error) {
    console.error("Error liking thought post: ", error);
    throw error;
  }
};

export const getThoughtPosts = async (limit: number = 20) => {
  try {
    const postsRef = ref(database, 'thoughtPosts');
    const snapshot = await get(postsRef);
    
    if (snapshot.exists()) {
      const posts = snapshot.val();
      return Object.keys(posts)
        .map(key => ({
          id: key,
          ...posts[key]
        }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
    }
    return [];
  } catch (error) {
    console.error("Error getting thought posts: ", error);
    throw error;
  }
};

export const listenToThoughtPosts = (callback: (posts: any[]) => void, limit: number = 20) => {
  const postsRef = ref(database, 'thoughtPosts');
  const unsubscribe = onValue(postsRef, (snapshot) => {
    if (snapshot.exists()) {
      const posts = snapshot.val();
      const formattedPosts = Object.keys(posts)
        .map(key => ({
          id: key,
          ...posts[key]
        }))
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, limit);
      callback(formattedPosts);
    } else {
      callback([]);
    }
  });
  return unsubscribe;
};

export const saveSelfCareChecklist = async (userId: string, checklist: Record<string, boolean>) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    await set(ref(database, `selfCare/${userId}/${today}`), {
      ...checklist,
      timestamp: Date.now()
    });
    return today;
  } catch (error) {
    console.error("Error saving self-care checklist: ", error);
    throw error;
  }
};

export const getSelfCareChecklist = async (userId: string) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const checklistRef = ref(database, `selfCare/${userId}/${today}`);
    const snapshot = await get(checklistRef);
    
    if (snapshot.exists()) {
      return snapshot.val();
    }
    return null;
  } catch (error) {
    console.error("Error getting self-care checklist: ", error);
    throw error;
  }
};

export { auth, database };
