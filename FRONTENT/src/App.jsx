import React from "react";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import { UserProvider } from "./context/UserContext";

function App({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default App;
