/**
 * hooks/useAuth.js
 * Đọc thông tin user đang đăng nhập từ localStorage.
 *
 * Sử dụng:
 *   const { user, isLoggedIn, isAdmin, isTutor, isParent, refresh } = useAuth();
 */

import { useState, useEffect } from "react";
import { ROLES } from "../constants";
import { getCurrentUser } from "../api/authApi";

export function useAuth() {
  const [user, setUser] = useState(() => getCurrentUser());

  useEffect(() => {
    const sync = () => setUser(getCurrentUser());
    window.addEventListener("storage", sync);
    window.addEventListener("studyhub-auth-change", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("studyhub-auth-change", sync);
    };
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    isAdmin:    user?.role === ROLES.ADMIN,
    isTutor:    user?.role === ROLES.TUTOR,
    isParent:   user?.role === ROLES.PARENT,
    refresh: () => setUser(getCurrentUser()),
  };
}
