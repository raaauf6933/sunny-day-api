import "./App.css";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Admin from "./admin";
import Client from "./client-side";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </>
  );
};

const Routes = () => {
  return (
    <Switch>
      <Route path="/*" element={<Client />} />
      <Route exact path="/admin/*" element={<Admin />} />
    </Switch>
  );
};

export default App;
