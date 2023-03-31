import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import DetailPage from "./pages/DetailPage";
import EditForm from "./pages/EditForm";

import styled from "styled-components";

const AppContainer = styled.div`
  background-color: #1f2833;
  color: #c5c6c7;
`;

function App() {
  return (
    <AppContainer>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/product/:productId" element={<DetailPage />} />
        <Route path="/product/:productId/edit" element={<EditForm />} />
      </Routes>
      <Footer />
    </AppContainer>
  );
}

export default App;
