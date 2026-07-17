import React, { useContext } from "react";
import Header from "./components/pages/Header";
import Footer from "./components/pages/Footer";
import { UserContext } from "./context/UserContext";

function App({ children }) {
  const { loading } = useContext(UserContext);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <span className="w-8 h-8 border-3 border-slate-200 border-t-indigo-600 rounded-full animate-spin"></span>
      </div>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default App;
