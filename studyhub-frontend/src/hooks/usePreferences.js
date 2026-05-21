import { useEffect, useState } from "react";

const LANGUAGE_KEY = "studyhub_language";
const THEME_KEY = "studyhub_theme";

function getStoredLanguage() {
  return localStorage.getItem(LANGUAGE_KEY) || "vi";
}

function getStoredTheme() {
  const raw = localStorage.getItem(THEME_KEY);
  return raw === "dark" || raw === "light" ? raw : "light";
}

function emitChange(eventName) {
  window.dispatchEvent(new Event(eventName));
}

export function useLanguage() {
  const [lang, setLangState] = useState(getStoredLanguage);

  useEffect(() => {
    document.documentElement.lang = lang;
    const onStorage = () => setLangState(getStoredLanguage());
    const onCustom = () => setLangState(getStoredLanguage());
    window.addEventListener("storage", onStorage);
    window.addEventListener("studyhub-language-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("studyhub-language-change", onCustom);
    };
  }, [lang]);

  const setLang = (nextLang) => {
    localStorage.setItem(LANGUAGE_KEY, nextLang);
    setLangState(nextLang);
    emitChange("studyhub-language-change");
  };

  const toggleLang = () => setLang(lang === "vi" ? "en" : "vi");

  return { lang, setLang, toggleLang };
}

export function useTheme() {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.setAttribute("data-theme", theme);
    document.body.classList.toggle("dark", isDark);
    const onStorage = () => setThemeState(getStoredTheme());
    const onCustom = () => setThemeState(getStoredTheme());
    window.addEventListener("storage", onStorage);
    window.addEventListener("studyhub-theme-change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("studyhub-theme-change", onCustom);
    };
  }, [theme]);

  const setTheme = (nextTheme) => {
    const safeTheme = nextTheme === "dark" ? "dark" : "light";
    localStorage.setItem(THEME_KEY, safeTheme);
    setThemeState(safeTheme);
    emitChange("studyhub-theme-change");
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return { theme, setTheme, toggleTheme };
}
