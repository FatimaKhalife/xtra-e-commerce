import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")!).render(
  <StrictMode>

    <GoogleOAuthProvider clientId="193996195656-824cksash9j9k8qcucrap7lllvuqfdet.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>

  </StrictMode>
);
