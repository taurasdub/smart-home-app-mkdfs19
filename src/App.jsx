import React, { createContext, useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import ClientLanding from "./features/client/pages/ClientLanding/ClientLanding";
import "./App.css";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContextProvider>
        <div id={theme}>
          <ClientLanding />
        </div>
      </AuthContextProvider>
    </ThemeContext.Provider>
  );
}

export default App;
