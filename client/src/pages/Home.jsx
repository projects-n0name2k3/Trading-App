import React from "react";
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-[1440px] h-[800px] bg-[#1c1d21] rounded-3xl grid grid-cols-12 place-content-start gap-x-5 ">
      <Header />
      <SideBar />
      <Outlet />
    </div>
  );
}
