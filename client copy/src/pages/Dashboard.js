import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     const user = jwt.decode(token);
  //     if (!user) {
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //     }
  //   }
  // });
  return <h1>Hello world</h1>;
};

export default Dashboard;
