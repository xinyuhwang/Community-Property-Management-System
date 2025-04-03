import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("guest"); // 'resident', 'admin'

  const login = (email, password, userRole) => {
    // In a real app, this would call your authentication service
    setUser({ email });
    setRole(userRole);
  };

  const logout = () => {
    setUser(null);
    setRole("guest");
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
