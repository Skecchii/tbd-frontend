import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";
import LoadingComponent from "./components/LoadingComponent";

import Home from "./pages/Home";
import CreateForm from "./pages/CreateForm";
import DetailPage from "./pages/DetailPage";
import EditForm from "./pages/EditForm";
import CartPage from "./pages/CartPage";

import styled from "styled-components";

const AppContainer = styled.div`
  background-color: #1f2833;
  color: #c5c6c7;
  height: 100vh;
`;

function App() {
  const [loading, setLoading] = useState(true)

  const handleLoading = () => {
    setLoading(false)
  }

  return (
    <AppContainer>
      {loading ? (
        <LoadingComponent handleLoading={handleLoading} />
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/product/:productId" element={<DetailPage />} />
            <Route path="/product/:productId/edit" element={<EditForm />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </AppContainer>
  );
}

export default App;
