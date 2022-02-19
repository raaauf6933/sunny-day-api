import React from "react";
import NavBar from "./../NavBar";
import DrawerComponent from "./../Drawer";
import Footer from "./../Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <DrawerComponent />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
