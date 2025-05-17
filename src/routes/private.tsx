import { type ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): any {
  //console.log("Teste");

  const [loading, setLoading] = useState(true);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDados = {
          uid: user?.uid,
          email: user?.email,
        };
        localStorage.setItem("@devlinkTree", JSON.stringify(userDados));
        setLoading(false);
        setSigned(true);
      } else {
        //console.log("usuario LogOff");
        setLoading(false);
        setSigned(false);
      }
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div></div>;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
}
