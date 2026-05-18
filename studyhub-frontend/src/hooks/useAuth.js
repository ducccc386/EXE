/**
 * hooks/useAuth.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom hook để đọc thông tin user từ localStorage.
 * Dùng hook này thay vì gọi JSON.parse(localStorage.getItem(...)) trực tiếp.
 *
 * Sử dụng:
 *   const { user, isLoggedIn, isAdmin, isTutor, isParent } = useAuth();
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useState, useEffect } from "react";
import { STORAGE_KEYS, ROLES } from "../constants";
import { getCurrentUser } from "../services/authService";

export function useAuth() {
  const [user, setUser] = useState(() => getCurrentUser());

  // Lắng nghe thay đổi localStorage (ví dụ login/logout ở tab khác)
  useEffect(() => {
    const onStorage = () => setUser(getCurrentUser());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return {
    user,
    isLoggedIn: !!user,
    isAdmin:    user?.role === ROLES.ADMIN,
    isTutor:    user?.role === ROLES.TUTOR,
    isParent:   user?.role === ROLES.PARENT,
    /** Gọi sau khi login() thành công để re-render Navbar */
    refresh: () => setUser(getCurrentUser()),
  };
}
