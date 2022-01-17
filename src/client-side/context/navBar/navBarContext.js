import React, { useReducer } from "react";
import { navbarReducer, initialState } from "./navBarReducer";

const NavbarContext = React.createContext({});

export function NavbarProvider({ children }) {
  const [navbarState, navbarDispatch] = useReducer(navbarReducer, initialState);

  return (
    <NavbarContext.Provider value={{ navbarState, navbarDispatch }}>
      {children}
    </NavbarContext.Provider>
  );
}

export default NavbarContext;
