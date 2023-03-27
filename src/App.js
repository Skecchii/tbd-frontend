import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import DetailPage from "./pages/DetailPage";
import EditForm from "./pages/EditForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/product/:productId" element={<DetailPage />} />
        <Route path="/product/:productId/edit" element={<EditForm />} />
      </Routes>
    </>
  );
}

export default App;
