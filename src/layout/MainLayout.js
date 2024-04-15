//Bu layout navbar ve footer içeren bir layouttur.

import React from "react";
import Navbar from "../components/Navbar";
import { FooterContainer } from "../components/footer/containers/footer";

function MainLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
      <FooterContainer/>
    </div>
  );
}

export default MainLayout;
