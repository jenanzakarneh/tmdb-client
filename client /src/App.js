import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import MovieDetails from "./pages/MovieDetails";
import Lists from "./pages/Lists";
import PrivateRoute from "./components/PrivateRoute";
const App = () => {
  return (
    <div className="parent-container">
      <Routes>
        <Route path="/" exact Component={Login} />
        <Route path="/login" exact Component={Login} />
        <Route path="/register" exact Component={Register} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/search/:query"
          element={
            <PrivateRoute>
              <Search />
            </PrivateRoute>
          }
        />
        <Route
          path="/movieDetails/:id"
          element={
            <PrivateRoute>
              <MovieDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/myLists"
          element={
            <PrivateRoute>
              <Lists />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
export default App;
