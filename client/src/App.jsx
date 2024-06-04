import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import ChartMain from "./components/ChartMain";
import TargetMain from "./components/TargetMain";
import StatisticMain from "./components/StatisticMain";
import CalculatorMain from "./components/CalculatorMain";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />}>
          <Route path="/" element={<ChartMain />} />
          <Route path="target" element={<TargetMain />} />
          <Route path="statistic" element={<StatisticMain />} />
          <Route path="caculator" element={<CalculatorMain />} />
        </Route>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
