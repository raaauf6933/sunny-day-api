import React, { useReducer } from "react";
import { AppStateReducer, initialState } from "./reducer";

const AppStateContext = React.createContext({});

export function AppStateProvider({ children }) {
  const [appState, appStateDispatch] = useReducer(
    AppStateReducer,
    initialState
  );

  return (
    <AppStateContext.Provider value={{ appState, appStateDispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export default AppStateContext;
