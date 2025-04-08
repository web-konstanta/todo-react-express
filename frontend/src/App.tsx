import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter } from "react-router";
import AppRouter from "./AppRouter";
import { AuthContext } from "./context";
import { useState, useEffect } from "react";
import { AuthService } from "./api/auth";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = AuthService.getToken();
    if (token) {
      setIsAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
