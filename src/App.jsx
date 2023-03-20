import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import RoomDetails from "./features/client/components/RoomDetails/RoomDetails";
import ClientLanding from "./features/client/pages/ClientLandingPage/ClientLanding";

function App() {
  return (
    <AuthContextProvider>
      <ClientLanding />
    </AuthContextProvider>
  );
}

export default App;
