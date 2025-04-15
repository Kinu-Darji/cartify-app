
import React, { useEffect, useState ,ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../src/Firebase/Firebase"; 


const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  if (checkingAuth) return <div className="text-center mt-10">Checking authentication...</div>;

  return user ? children : <Navigate to="/login" />;

};

export default ProtectedRoute;
