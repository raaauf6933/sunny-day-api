import React from "react";
import NavigationBar from "./../NavigationBar";
import DrawerComponent from "./../Drawer";
import Footer from "./../Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <DrawerComponent />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
