import { Route, Routes, Navigate } from "react-router";
import { authRoutes } from "./routes/authRoutes";
import "./App.css";
import { todoRoutes } from "./routes/todoRoutes";
import { useContext } from "react";
import { AuthContext } from "./context";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="content">
      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to={isAuth ? "/todo" : "/sign-in"} replace />}
          />
          {authRoutes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              element={
                isAuth ? <Navigate to="/todo" replace /> : <route.component />
              }
            />
          ))}
          {todoRoutes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              element={
                isAuth ? (
                  <route.component />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default AppRouter;
