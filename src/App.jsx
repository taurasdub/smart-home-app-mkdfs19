import React from "react";
import { AuthContextProvider } from "./context/AuthContext";
import ClientLanding from "./features/client/pages/ClientLanding/ClientLanding";

function App() {
  return (
    <AuthContextProvider>
      <ClientLanding />
    </AuthContextProvider>
  );
}

export default App;
