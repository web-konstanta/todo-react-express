import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter";
import { AuthContext } from "./context";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
