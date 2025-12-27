import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db, ADMIN_EMAIL } from '../firebase/config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);


  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        // Check if admin
        if (user.email === ADMIN_EMAIL) {
          setIsAdmin(true);
          setUserData({
            uid: user.uid,
            email: user.email,
            fullName: "Admin",
            role: 'admin',
            createdAt: new Date().toISOString()
          });
        } else {
          setIsAdmin(false);
          // Get user data from Firestore
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              setUserData({ ...userDoc.data(), role: 'user' });
            } else {
              // Create default user data
              setUserData({
                uid: user.uid,
                email: user.email,
                fullName: user.displayName || user.email.split('@')[0] || 'User',
                role: 'user',
                createdAt: new Date().toISOString(),
                orders: []
              });
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      } else {
        setCurrentUser(null);
        setUserData(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

const logout = async () => {
  try {
    await signOut(auth);
    setCurrentUser(null);
    setIsAdmin(false);
    setUserData(null);
    setLoading(false);
  } catch (error) {
    console.error('Error logging out:', error);
    setError('Failed to log out');
  }
};

  const value = {
    currentUser,
    userData,
    loading,
    isAdmin,
    logout,
    setUserData
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};