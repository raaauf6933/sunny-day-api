import React from "react";
import NavigationBar from "./../NavigationBar";
import DrawerComponent from "./../Drawer";
import Footer from "./../Footer";

const AppLayout = ({ children, awake }) => {
  return (
    <>
      <NavigationBar awake={awake} />
      <DrawerComponent />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AppLayout;
