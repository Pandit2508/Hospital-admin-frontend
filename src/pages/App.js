// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./src/pages/Home";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Only Home Page for now */}
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
