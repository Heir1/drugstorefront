"use client";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store, { persistor } from "./redux/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./pages/login/Login";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Marque que le client est monté
  }, []);

  if (!isClient) {
    return null; // Evite l'affichage avant que le client ne soit monté
  }

  return (
    <Provider store={store}>
      {/* <Toaster /> */}
      {/* Vérifie que persistor n'est pas null avant de l'utiliser */}
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          <Login />
        </PersistGate>
      ) : (
        <Login />
      )}
    </Provider>
  );
}
